import { createContext, memo, useRef } from "react";

export const ModalContext = createContext();

const ModalManager = memo(({ children }) => {
	const modalCountRef = useRef(0);
	return (
		<ModalContext.Provider value={modalCountRef}>
			{children}
		</ModalContext.Provider>
	);
});

export default ModalManager;
