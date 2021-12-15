import React, { memo, useCallback, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import isAuth from "../utils/isAuth";
import useIdentity from "../hooks/useIdentity";
import { FETCH_USER_URL } from "../conf";
import { Loader } from "./CoreUI";
import useResource from "../hooks/useResource";

import { Switch } from "react-router-dom";
import { useMoralis } from "react-moralis";
const DEBUG = true;
const logger = (log) => (DEBUG ? console.log(log) : null);

export const PROTECTION = {
	UN_AUTH: 0,
	AUTH: 1,
	AGNOSTIC: 2,
};

const RestrictedRoute = memo(
	({
		children,
		path,
		exact = true,
		setup = false,
		protection = PROTECTION.AUTH,
		...props
	}) => {
		const { user, setUser, fetchedRef } = useIdentity();

		const [{ loading, data, error }, fetchUser] = useResource(
			{
				method: "GET",
				url: FETCH_USER_URL,
			},
			false
		);
		const authStatus = isAuth();

		const startFetch = useCallback(() => {
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
		}, [
			protection,
			user,
			loading,
			error,
			fetchUser,
			fetchedRef,
			authStatus,
		]);

		useEffect(() => {
			if (!data) {
				return;
			}
			fetchedRef.current = false;
			setUser({
				...data,
			});
		}, [data, setUser, fetchedRef]);

		const { isAuthenticated: walletAdded } = useMoralis();

		console.log(`walletAdded`, walletAdded);

		const render = useCallback(
			({ match: { path: matchedPath } }) => {
				/*
				4 cases
				0 -> !protect && !authStatus - Normally render children
				1 -> !protect && authStatus - Invalid state - Send to root (XOR hit) 
				2 -> protect && !authStatus - Invalid state - Send to root (XOR hit) 
				3 -> protect && authStatus - Wait for user, and then proceed to render children.
			*/

				if (matchedPath !== path) return null;

				startFetch();

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
					if ((walletAdded && !setup) || (!walletAdded && setup)) {
						console.log(`here`);
						return children;
					} else {
						console.log(`sad here`);
						return (
							<Redirect
								to={walletAdded ? "/dashboard" : "/onboarding"}
							/>
						);
					}
				} else if (error) {
					return "Whoops! Can't fetch user";
				} else {
					return "An unknown error occurred. Please try again later";
				}
			},
			[
				authStatus,
				path,
				startFetch,
				protection,
				children,
				error,
				user,
				walletAdded,
				setup,
			]
		);

		return (
			<Switch>
				<Route path={path} exact={exact} {...props}>
					{render}
				</Route>
			</Switch>
		);
	}
);

export default RestrictedRoute;
