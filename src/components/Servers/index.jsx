import { memo, useCallback, useState } from "react";
import { FETCH_SERVERS_URL } from "../../conf";

import DEFAULT_SERVER_ICON from "../../img/default-server.png";

import useResource from "../../hooks/useResource";
import parseError from "../../utils/parseError";
import { Card, Loader, StatusLabel } from "../CoreUI";
import "./servers.css";
import ServerModal from "../modals/ServerModal";

const Server = memo(({ server, index, onOpen }) => {
	return (
		<Card className="server" onClick={() => onOpen(index)}>
			<img
				className="server-icon"
				src={server.avatar || DEFAULT_SERVER_ICON}
				alt=""
			/>
			<h3 className="server-name">{server.name}</h3>
		</Card>
	);
});

const Servers = memo(() => {
	const [{ error, data: servers }] = useResource({
		url: FETCH_SERVERS_URL,
		method: "GET",
	});

	const [openServer, setOpenServer] = useState(null);

	const handleClose = useCallback(() => {
		setOpenServer(null);
	}, []);

	const handleOpen = useCallback(
		(index) => {
			setOpenServer(servers.guilds[index]);
		},
		[servers]
	);

	return (
		<>
			<main className="servers">
				{servers && Array.isArray(servers.guilds) ? (
					servers.guilds.map((server, index) => (
						<Server
							onOpen={handleOpen}
							key={index}
							server={server}
							index={index}
						/>
					))
				) : error ? (
					<StatusLabel>{parseError(error)}</StatusLabel>
				) : (
					<Loader middle />
				)}
			</main>
			<ServerModal
				open={!!openServer}
				server={openServer}
				onClose={handleClose}
			/>
		</>
	);
});

export default Servers;
