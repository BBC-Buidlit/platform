import { memo, useContext } from "react";
import useIdentity from "../../hooks/useIdentity";
import useLogout from "../../hooks/useLogout";
import { Button } from "../CoreUI";
import { NavContext } from "../NavManager";
import "./nav.css";

const Nav = memo(() => {
	const { user } = useIdentity();
	const logout = useLogout();
	const { nav } = useContext(NavContext);

	return (
		nav?.visible &&
		nav?.activeItem !== undefined &&
		nav?.activeItem >= 0 &&
		user && (
			<header className="nav">
				<div className="nav-logo" src="" alt="" />
				<Button small rounded onClick={logout}>
					Logout
				</Button>
			</header>
		)
	);
});

export default Nav;
