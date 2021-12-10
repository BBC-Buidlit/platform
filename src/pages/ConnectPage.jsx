import { memo, useEffect } from "react";
import { Redirect } from "react-router";
import useIdentity from "../hooks/useIdentity";
import GET from "../utils/GET";
import tokenStorage from "../utils/tokenStorage";

const token = GET("token");

const ConnectPage = memo(() => {
	const { setUser } = useIdentity();

	useEffect(() => {
		if (token) {
			tokenStorage.set(token);
			setUser(null);
		}
	}, [setUser]);

	return <Redirect to={"/"} />;
});

export default ConnectPage;
