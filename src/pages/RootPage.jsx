import { memo } from "react";
import { Redirect } from "react-router";
import isAuth from "../utils/isAuth";

const RootPage = memo(() => {
	console.log(`Mounted!!!`, isAuth());
	return <Redirect to={isAuth() ? "/dashboard" : "/login"} />;
});

export default RootPage;
