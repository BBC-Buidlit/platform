import { useCallback, useContext } from "react";
import { UserContext } from "../components/UserManager";

const useIdentity = () => {
	const { setUser, ...rest } = useContext(UserContext);

	const updateUser = useCallback(
		(cb) => setUser((user) => (typeof cb === "function" ? cb(user) : cb)),
		[setUser]
	);

	return { setUser: updateUser, ...rest };
};

export default useIdentity;
