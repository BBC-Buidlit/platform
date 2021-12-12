import { memo, useEffect } from "react";
import { FETCH_SERVER_URL } from "../../conf";
import useResource from "../../hooks/useResource";
import parseError from "../../utils/parseError";
import { Card, Loader, SquareImgTile, StatusLabel } from "../CoreUI";
import DEFAULT_SERVER_ICON from "../../img/default-server.png";
import Modal from "./Modal";

import "./server-modal.css";

const ServerModal = memo(({ server, open, ...rest }) => {
	const [{ error, data: serverData, loading }, fetchData, reset] =
		useResource(
			{
				url: FETCH_SERVER_URL(server?.id),
				method: "GET",
			},
			false
		);

	useEffect(() => {
		if (open) {
			if (server?.id && !loading && !error && !serverData) fetchData();
		} else {
			reset();
		}
	}, [open, server, reset, error, loading, fetchData, serverData]);

	console.log(`serverData`, serverData);

	return (
		<Modal className="server-modal" fullScreen open={open} dark {...rest}>
			{serverData && server ? (
				<section className="server-details">
					<aside className="server-aside">
						<SquareImgTile
							src={serverData.avatar || DEFAULT_SERVER_ICON}
							className="server-aside-icon"
							alt=""
						/>
						<h3 className="server-aside-name">{server.name}</h3>
					</aside>
					<main className="server-proposals">
						<Card dark className="server-proposal"></Card>
						<Card dark className="server-proposal"></Card>
						<Card dark className="server-proposal"></Card>
						<Card dark className="server-proposal"></Card>
						<Card dark className="server-proposal"></Card>
						<Card dark className="server-proposal"></Card>
					</main>
				</section>
			) : error ? (
				<StatusLabel>{parseError(error)}</StatusLabel>
			) : (
				<Loader middle />
			)}
		</Modal>
	);
});
export default ServerModal;
