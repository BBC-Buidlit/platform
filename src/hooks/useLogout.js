import { useCallback } from "react";
import { useHistory } from "react-router";
import tokenStorage from "../utils/tokenStorage";

import useIdentity from "./useIdentity";

const useLogout = () => {
	const history = useHistory();
	const { setUser } = useIdentity();

	const logout = useCallback(() => {
		tokenStorage.clear();
		history.push("/");
		setUser(null);
	}, [history, setUser]);

	return logout;
};

export default useLogout;
