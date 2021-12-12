import { memo, useCallback, useEffect, useState } from "react";
import Modal, { ModalHeader } from "./Modal";

import "./add-server-modal.css";
import { FETCH_OWNED_SERVERS_URL, IMPORT_SERVERS_URL } from "../../conf";
import Servers from "../Servers";
import useResource from "../../hooks/useResource";
import { StatusLabel } from "../CoreUI";
import parseError from "../../utils/parseError";

const AddServerModal = memo(({ onDone, onClose, open, ...rest }) => {
	const [selected, setSelected] = useState(null);

	const [{ error, data }, importServer, reset] = useResource(
		{
			url: IMPORT_SERVERS_URL(selected),
			method: "POST",
		},
		false
	);

	const handleSelect = useCallback(
		(server) => {
			console.log(`server`, server);
			setSelected(server.discord_id);
			importServer();
		},
		[importServer]
	);

	useEffect(() => {
		if (!data) return;
		onClose();
		onDone();
		reset();
	}, [data, reset, onDone, onClose]);

	useEffect(() => {
		if (data || error) {
			setSelected(null);
		}
	}, [data, error]);

	useEffect(() => {
		if (!open) reset();
	}, [open, reset]);

	return (
		<Modal
			className="add-server-modal"
			onClose={onClose}
			open={open}
			{...rest}
		>
			<ModalHeader
				heading="Import your servers"
				onClose={onClose}
			></ModalHeader>
			<Servers
				wide
				url={FETCH_OWNED_SERVERS_URL}
				onSelect={handleSelect}
				selectText="Import"
				serverLoading={selected}
			/>
			{error && <StatusLabel>{parseError(error)}</StatusLabel>}
		</Modal>
	);
});
export default AddServerModal;
