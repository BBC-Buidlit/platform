import { motion } from "framer-motion";
import {
	forwardRef,
	memo,
	useCallback,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { CheckIcon, MinusIcon } from "../icons";
import { standardEaseOutTransition } from "../../utils/anim";
import mergeRefs from "../../utils/mergeRefs";
import "./core-ui.css";

export const Button = memo(
	({
		children,
		className = "",
		type = "button",
		center = false,
		middle = false,
		rounded = false,
		circular = false,
		dark = false,
		darkGradient = false,
		translucent = false,
		transparent = false,
		small = false,
		theme = false,
		capitalize = false,
		metal = false,
		icon = false,
		large = false,
		disabled = false,
		fullWidth = false,
		...props
	}) => {
		const renderedButton = useMemo(
			() => (
				<motion.button
					className={`btn ${className} ${
						middle ? "btn-middle" : ""
					} ${rounded ? "btn-rounded" : ""} ${
						circular ? "btn-circular" : ""
					} ${dark ? "btn-dark" : ""} ${
						capitalize ? "btn-capitalize" : ""
					} ${theme ? "btn-theme" : ""} ${
						darkGradient ? "btn-dark-grad" : ""
					}  ${metal ? "btn-metal" : ""} ${
						small ? "btn-small" : ""
					}  ${translucent ? "btn-translucent" : ""} ${
						icon ? "btn-icon" : ""
					} ${large ? "btn-large" : ""} ${
						disabled ? "btn-disabled" : ""
					} ${fullWidth ? "btn-full-width" : ""} ${
						transparent ? "btn-transparent" : ""
					}`}
					disabled={disabled}
					{...props}
				>
					{children}
				</motion.button>
			),
			[
				transparent,
				className,
				middle,
				rounded,
				circular,
				dark,
				theme,
				capitalize,
				darkGradient,
				metal,
				small,
				translucent,
				icon,
				large,
				fullWidth,
				disabled,
				props,
				children,
			]
		);

		if (center) {
			return <section className="btn-center">{renderedButton}</section>;
		}

		return renderedButton;
	}
);

export const Card = memo(
	forwardRef(
		(
			{
				dark = false,
				flatTop = false,
				flatBottom = false,
				padded = true,
				children,
				className = "",
				translucent = false,
				blur = false,
				footer = false,
				transparent = false,
				header = false,
				noShadow = false,
				...props
			},
			ref
		) => {
			return (
				<motion.section
					className={`card ${className} ${dark ? "card-dark" : ""} ${
						flatTop ? "card-flat-top" : ""
					} ${flatBottom ? "card-flat-bottom" : ""} ${
						padded ? "card-padded" : ""
					} ${translucent ? "card-translucent" : ""} ${
						noShadow ? "card-no-shadow" : ""
					} ${transparent ? "card-transparent" : ""} ${
						blur ? "card-blur" : ""
					}`}
					ref={ref}
					{...props}
				>
					{header && (
						<section className="card-header">{header}</section>
					)}
					<section className="card-content">{children}</section>
					{footer && (
						<section className="card-footer">{footer}</section>
					)}
				</motion.section>
			);
		}
	)
);

export const CardSubheading = memo(
	({ children, large = false, center = false, className = "", ...props }) => (
		<h3
			className={`card-subheading ${className} ${
				center ? "text-center" : ""
			} ${large ? "card-subheading-large" : ""}`}
			{...props}
		>
			{children}
		</h3>
	)
);

export const CardHeading = memo(
	({
		children,
		large = false,
		light,
		className = "",
		center = false,
		...props
	}) => (
		<h1
			className={`card-heading ${className}  ${
				center ? "text-center" : ""
			} ${large ? "card-heading-large" : ""} ${
				light ? "card-heading-light" : ""
			}`}
			{...props}
		>
			{children}
		</h1>
	)
);

export const ImgTile = memo(
	forwardRef(
		(
			{
				className = "",
				rounded = false,
				circular = false,
				shadow = false,
				padded = false,
				...props
			},
			ref
		) => (
			<motion.img
				className={`img-tile ${circular ? "img-tile-circular" : ""} ${
					rounded ? "img-tile-rounded" : ""
				} ${shadow ? "img-tile-shadow" : ""} ${
					padded ? "img-tile-padded" : ""
				} ${className}`}
				alt={props?.alt || ""}
				ref={ref}
				{...props}
			/>
		)
	)
);

export const SquareImgTile = memo(
	({
		className = "",
		width,
		borderLess,
		circular = false,
		sharp,
		src,
		children,
		animationProps,
		...props
	}) => (
		<motion.section
			className={`square-img-tile  ${
				circular ? "square-img-tile-circular" : ""
			} ${sharp ? "square-img-tile-sharp" : ""} ${
				borderLess ? "square-img-tile-border-less" : ""
			} ${className}`}
			style={width ? { width: width } : {}}
			{...animationProps}
		>
			{children}
			{src ? <img alt={props?.alt || ""} {...props} src={src} /> : null}
		</motion.section>
	)
);

export const TabSwitcher = memo(
	forwardRef(
		(
			{
				className = "",
				value = 0,
				options,
				onChange,
				onFocus,
				name,
				dark = false,
				flat = false,
				small = false,
				large = false,
				translucent = false,
				iconOnly = false,
				maxOptionWidth = false,
				...props
			},
			ref
		) => {
			const optionsRef = useRef([]);
			const parentRef = useRef();

			const [activeBox, setActiveBox] = useState(null);

			useLayoutEffect(() => {
				if (!optionsRef.current[value]) return null;
				setActiveBox(optionsRef.current[value].getBoundingClientRect());
			}, [value, options]);

			const handleChange = (value) => {
				if (typeof onChange !== "function") return;
				onChange({ target: { name, value } });
			};

			return (
				<section
					className={`tab-switcher ${className} ${
						flat ? "tab-switcher-flat" : ""
					} ${dark ? "tab-switcher-dark" : ""} ${
						small ? "tab-switcher-small" : ""
					} ${large ? "tab-switcher-large" : ""} ${
						translucent ? "tab-switcher-translucent" : ""
					} ${iconOnly ? "tab-switcher-icon-only" : ""}`}
					ref={mergeRefs(ref, parentRef)}
					onFocus={onFocus}
					{...props}
				>
					<motion.div
						className="tab-switcher-highlight"
						transition={standardEaseOutTransition}
						animate={
							activeBox
								? {
										left:
											activeBox.left -
											(parentRef.current
												? parentRef.current.getBoundingClientRect()
														.x
												: 0),
										width: activeBox.width,
										height: activeBox.height,
								  }
								: {}
						}
						// style={activeBox ? {} : {}}
					>
						<div className="tab-switcher-highlight-inner"></div>
					</motion.div>
					{options.map((option, index) => (
						<section
							className={`tab-switcher-option ${
								value === index
									? "tab-switcher-option-active"
									: ""
							}`}
							ref={(el) => {
								optionsRef.current[index] = el;
							}}
							onClick={() => handleChange(index)}
						>
							{option.icon ? (
								<span>{option.icon}</span>
							) : option.iconImg ? (
								<img
									src={
										value === index
											? option.iconImg
											: option.inactiveIconImg
									}
									alt=""
								/>
							) : null}
							{option.text}
						</section>
					))}
				</section>
			);
		}
	)
);

export const Loader = memo(
	({
		small = false,
		center = false,
		middle = false,
		light = false,
		dark = false,
		className = "",
		...props
	}) => (
		<motion.div
			className={`loader ${center ? "loader-center" : ""} ${
				middle ? "loader-middle" : ""
			} ${small ? "loader-small" : ""}
			${light ? "loader-light" : ""} ${dark ? "loader-dark" : ""} ${className}`}
			{...props}
		>
			<div className="loader-circle" />
		</motion.div>
	)
);
export const GradientText = memo(
	({ children, className = "", thick = false, ...props }) => (
		<motion.span
			className={`gradient-text ${className} ${
				thick ? "gradient-text-thick" : ""
			}`}
			{...props}
		>
			{children}
		</motion.span>
	)
);

export const Badge = memo(
	forwardRef(
		(
			{
				children,
				className = "",
				theme = false,
				thickText = false,
				selected = false,
				dark = false,
				onClick,
				small = false,
				large = false,
				img = null,
				...props
			},
			ref
		) => {
			const handleClick = useCallback(() => {
				if (typeof onClick !== "function") {
					return;
				}
				onClick({ selected: !selected, ...props });
			}, [onClick, selected, props]);

			return (
				<motion.div
					className={`badge ${img ? "badge-img" : ""} ${
						theme ? "badge-theme" : ""
					} ${dark ? "badge-dark" : ""} ${
						large ? "badge-large" : ""
					} ${small ? "badge-small" : ""} ${
						selected ? "badge-selected" : ""
					} ${thickText ? "badge-thick-text" : ""} ${className}`}
					onClick={handleClick}
					ref={ref}
					{...props}
				>
					{img && <ImgTile src={img} circular />}
					{children}
				</motion.div>
			);
		}
	)
);

export const Checkbox = memo(
	({ className = "", indeterminate, onClick, ...rest }) => {
		return (
			<label className={`checkbox ${className}`} onClick={onClick}>
				<input type="checkbox" {...rest} />
				<div className="checkbox-checkmark">
					{indeterminate ? <MinusIcon /> : <CheckIcon />}
				</div>
			</label>
		);
	}
);

export const Page = memo(
	forwardRef(({ children, className = "", ...props }, ref) => {
		return (
			<motion.section
				className={`page ${className}`}
				ref={ref}
				{...props}
			>
				{children}
			</motion.section>
		);
	})
);
