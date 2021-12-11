import { createContext, memo, useRef, useState } from "react";

export const UserContext = createContext();

export const getUserShortName = (user) => {
	if (!user) return "";
	let shortName =
		typeof user.first_name === "string" && user.first_name
			? user.first_name
			: "";
	if (shortName && typeof user.last_name === "string" && user.last_name) {
		shortName = `${shortName} ${user.last_name.trim().charAt(0)}.`;
	}
	return shortName;
};

const UserManager = memo(({ children }) => {
	const [user, setUser] = useState(null);
	const fetchedRef = useRef(false);

	return (
		<UserContext.Provider value={{ user, setUser, fetchedRef }}>
			{children}
		</UserContext.Provider>
	);
});

export default UserManager;
