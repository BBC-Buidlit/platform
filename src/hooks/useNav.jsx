import { useContext, useEffect } from "react";
import { NavContext } from "../components/NavManager";

const useNav = (item) => {
	const { setNav } = useContext(NavContext);
	useEffect(() => {
		if (item === undefined || item === null) return;
		setNav({ visible: true, activeItem: item });
		return () => setNav({ visible: false, activeItem: -1 });
	}, [item, setNav]);
};

export default useNav;
