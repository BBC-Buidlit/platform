import { createContext, memo, useState } from "react";
import Nav from "./Nav";

export const NavContext = createContext();

export const NAV_ITEMS = {
	HOME: 0,
	FAVORITES: 1,
	PROFILE: 2,
};

const NavManager = memo(({ children }) => {
	const [nav, setNav] = useState({ visible: false, activeItem: -1 });

	return (
		<NavContext.Provider value={{ nav, setNav }}>
			<Nav />
			{children}
		</NavContext.Provider>
	);
});

export default NavManager;
