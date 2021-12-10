import { useCallback, useState } from "react";

const useModal = (initial = false, eventTargets) => {
	const [open, setOpen] = useState(initial);

	const handleOpen = useCallback((e) => {
		setOpen(true);
	}, []);
	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);
	const handleToggle = useCallback(() => {
		setOpen((open) => !open);
	}, []);

	return {
		open,
		setOpen,
		handleOpen,
		handleClose,
		handleToggle,
	};
};

export default useModal;
