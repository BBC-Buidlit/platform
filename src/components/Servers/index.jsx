import { memo, useEffect } from "react";

import DEFAULT_SERVER_ICON from "../../img/default-server.png";

import useResource from "../../hooks/useResource";
import parseError from "../../utils/parseError";
import { Button, Card, Loader, StatusLabel } from "../CoreUI";
import "./servers.css";
import { CoinIcon } from "../icons";

const Server = memo(
	({ server, index, onOpen, loading, selectText = "Open" }) => {
		return (
			<Card className="server" onClick={() => onOpen(index)}>
				<img
					className="server-icon"
					src={server.avatar || DEFAULT_SERVER_ICON}
					alt=""
				/>
				<h3 className="server-name">{server.name}</h3>
				{loading ? (
					<Loader small />
				) : (
					<Button small rounded metal fullWidth>
						{selectText}
					</Button>
				)}
			</Card>
		);
	}
);

const Servers = memo(
	({
		url,
		header,
		onSelect,
		reload,
		setReload,
		wide = false,
		serverLoading = false,
		...rest
	}) => {
		const [{ error, data: servers, loading }, reloadServers] = useResource({
			url,
			method: "GET",
		});

		useEffect(() => {
			if (reload && typeof setReload === "function" && !loading) {
				setReload(false);
				reloadServers();
			}
		}, [reload, setReload, loading, reloadServers]);

		return (
			<>
				<main className={`servers ${wide ? "servers-wide" : ""}`}>
					{header}
					{servers && Array.isArray(servers.guilds) ? (
						<>
							{servers.guilds.length > 0 ? (
								servers.guilds.map((server, index) => (
									<Server
										onOpen={() => onSelect(server)}
										key={index}
										server={server}
										index={index}
										loading={
											server.discord_id === serverLoading
										}
										{...rest}
									/>
								))
							) : (
								<section className="servers-none">
									<span>
										<CoinIcon />
									</span>
									<h3>Nothin' to see here</h3>{" "}
									<p>
										You've not added any servers. Proceed by
										importing a server you own.
									</p>
								</section>
							)}
						</>
					) : error ? (
						<StatusLabel>{parseError(error)}</StatusLabel>
					) : (
						<Loader middle />
					)}
				</main>
			</>
		);
	}
);

export default Servers;
