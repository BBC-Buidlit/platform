import { memo, useEffect } from "react";
import { Redirect } from "react-router";
import useIdentity from "../hooks/useIdentity";
import GET from "../utils/GET";
import isAuth from "../utils/isAuth";
import tokenStorage from "../utils/tokenStorage";

const token = GET("token");

const ConnectPage = memo(() => {
	const { setUser } = useIdentity();

	// const [done, setDone] = useState(false);

	useEffect(() => {
		if (token) {
			tokenStorage.set(token);
			console.log(`isAuth()`, isAuth());
			setUser(null);
		}
		// setDone(true);
	}, [setUser]);

	return <Redirect to={"/dashboard"} />;
});

export default ConnectPage;
