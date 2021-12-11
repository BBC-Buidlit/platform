import { memo } from "react";
import Modal from "./Modal";

import "./server-modal.css";

const ServerModal = memo(({ server, ...rest }) => {
	return <Modal className="server-modal" fullScreen {...rest}></Modal>;
});
export default ServerModal;
