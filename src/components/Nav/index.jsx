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

	// const {connectToMetamask, metaState} = useWeb3Provider();

	// const setupWallet = () => {
	// 	if(!metaState.isConnected) {
	// 		connectToMetamask()
	// 		//TODO: @lakshyabatman, here we need to send walletid to BE and also before that we make sure it's mainnet, this way each user can setup wallet id only once, which will be used by them
	// 	}
	// }

	return (
		nav?.visible &&
		nav?.activeItem !== undefined &&
		nav?.activeItem >= 0 &&
		user && (
			<header className="nav">
				<div className="nav-logo" src="" alt="" />
				<div className="flex-center">
					{/* <Button
						small
						rounded
						onClick={setupWallet}
						className="margin-right"
					>
						{metaState.isConnected
							? "Disconnect"
							: "Connect with Metamask"}
					</Button> */}
					<Button small rounded onClick={logout}>
						Logout
					</Button>
				</div>
			</header>
		)
	);
});

export default Nav;
