import { useCallback, useContext, useEffect, useRef } from "react";
import { ModalContext } from "../components/ModalManager";

const useModalCount = (open) => {
	const modalCountRef = useContext(ModalContext);
	const openedRef = useRef(false);

	const increment = useCallback(() => {
		modalCountRef.current++;
		document.body.style.overflow = "hidden";
	}, [modalCountRef]);

	const decrement = useCallback(() => {
		if (modalCountRef.current === 0) return;
		modalCountRef.current--;
		if (modalCountRef.current <= 0) document.body.style.overflow = "auto";
	}, [modalCountRef]);

	useEffect(() => {
		if (open) {
			increment();
			openedRef.current = true;
		} else if (!openedRef.current) return;

		return () => {
			if (open) decrement();
		};
	}, [open, increment, decrement]);
};

export default useModalCount;
