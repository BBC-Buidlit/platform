import { memo, useCallback, useMemo, useState } from "react";
import { FETCH_SERVERS_URL } from "../../conf";
import useModal from "../../hooks/useModal";
import { Button } from "../CoreUI";
import { AddIcon } from "../icons";
import AddServerModal from "../modals/AddServerModal";
import ServerModal from "../modals/ServerModal";
import Servers from "../Servers";
import "./added-servers.css";

const AddedServers = memo(() => {
	const {
		open: addOpen,
		handleClose: handleAddClose,
		handleOpen: handleAddOpen,
	} = useModal();

	const [openServer, setOpenServer] = useState(null);

	const handleClose = useCallback(() => {
		setOpenServer(null);
	}, []);

	const handleOpen = useCallback((server) => {
		setOpenServer(server);
	}, []);

	const [reload, setReload] = useState(false);

	const triggerReload = useCallback(() => {
		setReload(true);
	}, []);

	const header = useMemo(() => {
		return (
			<header className="added-servers-header">
				<h2>Your Servers</h2>
				<Button
					metal
					className="added-servers-import"
					onClick={handleAddOpen}
				>
					<span>
						<AddIcon />
					</span>{" "}
					Import Server
				</Button>
			</header>
		);
	}, [handleAddOpen]);
	return (
		<>
			<Servers
				url={FETCH_SERVERS_URL}
				header={header}
				reload={reload}
				onSelect={handleOpen}
				setReload={setReload}
			/>
			<AddServerModal
				onDone={triggerReload}
				open={addOpen}
				onClose={handleAddClose}
			/>{" "}
			<ServerModal
				open={!!openServer}
				server={openServer}
				onClose={handleClose}
			/>
		</>
	);
});

export default AddedServers;
