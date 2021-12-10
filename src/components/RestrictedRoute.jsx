import React, { memo, useEffect, useMemo, useRef } from "react";
import { Route, Redirect } from "react-router-dom";
import isAuth from "../utils/isAuth";
import useIdentity from "../hooks/useIdentity";
import { FETCH_USER_URL } from "../conf";
import { Loader } from "./CoreUI";
import useResource from "../hooks/useResource";
import useLogout from "../hooks/useLogout";

const DEBUG = false;
const logger = (log) => (DEBUG ? console.log(log) : null);

export const PROTECTION = {
	UN_AUTH: 0,
	AUTH: 1,
	AGNOSTIC: 2,
};

const RestrictedRoute = memo(
	({ children, path, exact, protection = PROTECTION.AUTH, ...props }) => {
		const { user, setUser } = useIdentity();
		const logout = useLogout();

		const fetchedRef = useRef(false);

		const [{ loading, data, error }, fetchUser] = useResource(
			{
				method: "GET",
				url: FETCH_USER_URL,
			},
			false
		);
		const authStatus = useMemo(() => isAuth()[0], []);

		useEffect(() => {
			if (
				(protection === PROTECTION.AUTH ||
					(protection === PROTECTION.AGNOSTIC && authStatus)) &&
				!user &&
				!loading &&
				!error &&
				!fetchedRef.current
			) {
				logger(`FETCHING USER`);
				fetchedRef.current = true;
				fetchUser();
			}
		}, [protection, user, loading, error, fetchUser, authStatus]);

		useEffect(() => {
			if (!error) {
				return;
			}
			return logout();
		}, [error, logout]);

		useEffect(() => {
			if (!data) {
				return;
			}
			fetchedRef.current = false;
			setUser({
				...data,
			});
		}, [data, setUser]);

		const renderChildren = useMemo(() => {
			/*
				4 cases
				0 -> !protect && !authStatus - Normally render children
				1 -> !protect && authStatus - Invalid state - Send to root (XOR hit) 
				2 -> protect && !authStatus - Invalid state - Send to root (XOR hit) 
				3 -> protect && authStatus - Wait for user, and then proceed to render children.
			*/

			if (
				(protection === PROTECTION.AUTH) ^ authStatus &&
				protection !== PROTECTION.AGNOSTIC
			) {
				return <Redirect to={"/"} />;
			}

			if (
				!(protection === PROTECTION.AUTH || authStatus) ||
				(protection === PROTECTION.AGNOSTIC && !authStatus)
			) {
				return children;
			}

			if (
				(protection === PROTECTION.AUTH ||
					(protection === PROTECTION.AGNOSTIC && authStatus)) &&
				!(user || error)
			) {
				return <Loader center />;
			}

			if (user) {
				return children;
			} else if (error) {
				return "Whoops! Can't fetch user";
			} else {
				return "An unknown error occurred. Please try again later";
			}
		}, [authStatus, protection, children, error, user]);

		return (
			<Route path={path} {...props}>
				{renderChildren}
			</Route>
		);
	}
);

export default RestrictedRoute;
