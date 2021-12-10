import { memo, useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import anim from "../../utils/anim";
import { Card, GradientText, Loader } from "../CoreUI";
import "./modal.css";
import useModalCount from "../../hooks/useModalCount";

export const ModalHeader = memo(
	({
		heading,
		icon,
		doneText = "Done",
		showCancel = true,
		secondaryText = null,
		onSecondaryAction = null,
		showDone = true,
		onClose,
		loading = false,
		onDone,
		shadowed,
		...rest
	}) => {
		return (
			<header
				className={`modal-header ${
					shadowed ? "modal-header-shadowed" : ""
				}`}
				{...rest}
			>
				<h2>
					<span>{icon}</span>
					{heading}
				</h2>
				<section className="modal-header-action">
					{loading ? (
						<Loader small />
					) : (
						<>
							{showCancel && (
								<span onClick={onClose}>Cancel</span>
							)}
							{secondaryText && (
								<span
									className="modal-header-action-done"
									onClick={onSecondaryAction}
								>
									{secondaryText}
								</span>
							)}
							{showDone && (
								<GradientText
									onClick={onDone}
									className="modal-header-action-done"
								>
									{doneText}
								</GradientText>
							)}
						</>
					)}
				</section>
			</header>
		);
	}
);

// overlayType -> transparent, dark
const Modal = memo(
	({
		open,
		onClose,
		children,
		className,
		overlayType = false,
		overlayClassName = "",
		sheet = false,
		overlayContent,
		zTop = false,
		overlayClose = true,
		fitContent = false,
		showOverflow = false,
		...rest
	}) => {
		const [root, setRoot] = useState(false);

		useModalCount(open);

		useEffect(() => {
			const handleKeyup = (e) => {
				if (e.keyCode === 27 && typeof onClose === "function")
					onClose();
			};

			document.addEventListener("keyup", handleKeyup);
			const cleanup = () =>
				document.removeEventListener("keyup", handleKeyup);

			if (root) return cleanup;
			let newRoot = document.querySelector("#modal-root");
			if (!newRoot) {
				newRoot = document.createElement("div");
				newRoot.id = "modal-root";
				document.body.appendChild(newRoot);
			}
			setRoot(newRoot);
			return cleanup;
		}, [root, onClose]);

		const handleOverlayClick = useCallback(
			({ target }) => {
				if (
					typeof onClose === "function" &&
					overlayClose &&
					target.classList.contains("modal-overlay")
				)
					onClose();
			},
			[onClose, overlayClose]
		);

		if (!root) {
			return null;
		}

		return ReactDOM.createPortal(
			<AnimatePresence>
				{open && (
					<motion.section
						className={`modal-overlay ${
							overlayType ? "modal-overlay-" + overlayType : ""
						} ${overlayClassName} ${
							zTop ? "modal-overlay-z-top" : ""
						}`}
						initial="initial"
						animate="animate"
						exit="exit"
						variants={anim.modalOverlay}
						onClick={handleOverlayClick}
					>
						{typeof overlayContent === "function"
							? overlayContent(onClose)
							: overlayContent}
						<Card
							className={`modal ${sheet ? "modal-sheet" : ""} ${
								fitContent ? "modal-fit-content" : ""
							} ${
								showOverflow ? "modal-show-overflow" : ""
							} ${className}`}
							flatBottom={sheet}
							{...rest}
							variants={anim.modal}
						>
							{typeof children === "function"
								? children(onClose)
								: children}
						</Card>
					</motion.section>
				)}
			</AnimatePresence>,
			root
		);
	}
);

export default Modal;
