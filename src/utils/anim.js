export const transition = {
	type: "spring",
	stiffness: 2000,
	mass: 3,
	damping: 100,
};

export const tooltipTransition = {
	type: "spring",
	stiffness: 1200,
	mass: 1,
	damping: 40,
};

export const subtleTransition = {
	type: "spring",
	stiffness: 300,
	mass: 2.6,
	damping: 40,
};

export const boomTransition = {
	type: "spring",
	stiffness: 800,
	mass: 7,
	damping: 75,
};

export const pageTransition = {
	type: "spring",
	stiffness: 2000,
	mass: 5,
	damping: 140,
};

export const slideTransition = {
	type: "spring",
	stiffness: 2000,
	mass: 4,
	damping: 140,
};

const selectTranition = {
	type: "spring",
	stiffness: 2000,
	mass: 6,
	damping: 120,
};

export const springyClose = {
	type: "spring",
	stiffness: 4000,
	mass: 1,
	damping: 180,
};

export const bouncyTransition = {
	type: "spring",
	stiffness: 1200,
	mass: 5,
	damping: 40,
};

const easeOutTransition = (duration) => ({
	ease: [0.23, 1, 0.32, 1],
	duration,
});

export const standardEaseOutTransition = easeOutTransition(0.3);

const anim = {
	variantFactory: ({
		x = 0,
		y = 0,
		opacity = 1,
		scale = 1,
		transitionProps = {},
	}) => ({
		initial: {
			x,
			opacity,
			y,
			scale,
		},
		animate: {
			y: 0,
			x: 0,
			opacity: 1,
			scale: 1,
			transition: { ...slideTransition, ...transitionProps },
		},
		exit: {
			x,
			y,
		},
	}),

	centralExpand: {
		initial: {
			scale: 0,
			opacity: 0.4,
			transition: bouncyTransition,
		},
		animate: {
			scale: 1,
			opacity: 1,
			transition: bouncyTransition,
		},
		exit: {
			scale: 0,
			opacity: 0.4,
			transition: bouncyTransition,
		},
	},

	modalOverlay: {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: subtleTransition,
		},
		exit: {
			opacity: 0,
			transition: subtleTransition,
		},
	},

	modal: {
		initial: {
			opacity: 0.5,
			y: 80,
			transition: subtleTransition,
		},
		animate: {
			opacity: 1,
			y: 0,
			transition: subtleTransition,
		},
		exit: {
			opacity: 1,
			y: 80,
			transition: subtleTransition,
		},
	},

	slowFade: {
		initial: {
			y: 20,
			opacity: 0.1,
			transition: easeOutTransition(0.4),
		},
		animate: {
			y: 0,
			opacity: 1,
			transition: easeOutTransition(0.4),
		},
		exit: {
			y: -20,
			opacity: 0.1,
			transition: easeOutTransition(0.4),
		},
	},

	fade: {
		initial: { opacity: 0.6 },
		animate: {
			opacity: 1,
			transition: {
				...subtleTransition,
				staggerChildren: 0.08,
			},
		},
		exit: {
			opacity: 0.6,
			transition: {
				...subtleTransition,
				staggerChildren: 0.08,
			},
		},
	},

	delayedFade: {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				delay: 0.7,
			},
		},
	},

	storyItem: {
		initial: {
			y: 25,
			opacity: 0,
			scale: 1.04,
		},
		animate: {
			y: 0,
			opacity: 1,
			scale: 1,
		},

		closed1: {
			y: 0,
			opacity: 1,
			scale: 0.95,
		},

		closed2: {
			y: 0,
			opacity: 0.7,
			scale: 0.89,
		},

		exit: {
			y: -25,
			opacity: 0,
		},
	},

	bubble: {
		initial: {
			y: -15,
			scale: 0.85,
			opacity: 0.4,
			transition: { type: "ut", duration: 0.3 },
		},
		animate: {
			scale: 1,
			opacity: 1,
			y: 0,
			// transition: subtleTransition,
			transition: { type: "easeOut", duration: 0.3 },
		},
		exit: {
			scale: 0.8,
			opacity: 0,
			y: 15,
			// transition: subtleTransition,
			transition: { type: "easeOut", duration: 0.3 },
		},
	},

	stack: {
		initial: ({ initial }) => ({
			...initial,
		}),
		animate: ({
			opacity = 1,
			offsetX = 0,
			offsetY = 0,
			scaleX = 1,
			scaleY = 1,
			scale = 1,
		}) => {
			return {
				opacity,
				scale,
				scaleX,
				scaleY,
				y: offsetY,
				x: offsetX,
				transition: pageTransition,
			};
		},
	},
	notification: {
		initial: () => ({
			opacity: 0,
			y: -20,
		}),
		animate: ({ idx, isMobile, offsetTop = 0 }) => ({
			opacity: 1,
			y: isMobile
				? idx * 70 + 25 + offsetTop
				: (idx + 1) * 80 + offsetTop,
			transition: easeOutTransition(0.5),
		}),
		exit: () => ({
			opacity: 0,
			scale: 0.98,
		}),
	},
	horizontalSlide: {
		initial: {
			opacity: 0.4,
			x: 20,
			transition: slideTransition,
		},
		animate: {
			x: 0,
			opacity: 1,
			transition: slideTransition,
		},
		exit: {
			opacity: 0.4,
			x: -20,
			transition: slideTransition,
		},
	},
	verticalSlide: {
		initial: ({ y } = { y: -20 }) => ({
			scale: 1,
			opacity: 0,
			y,
			transition: tooltipTransition,
		}),
		animate: {
			scale: 1,
			y: 0,
			opacity: 1,
			transition: tooltipTransition,
		},
		exit: ({ y } = { y: -20 }) => ({
			scale: 1,
			opacity: 0,
			y,
			transition: tooltipTransition,
		}),
	},

	sunSet: {
		initial: {
			y: -70,
			x: -70,
			scale: 0.5,
			opacity: 0,
			transition: easeOutTransition(0.8),
		},
		animate: {
			y: 0,
			x: 0,
			scale: 1,
			opacity: 1,
			transition: easeOutTransition(0.8),
		},

		exit: {
			y: -70,
			x: -70,
			scale: 0.5,
			opacity: 0,
			transition: easeOutTransition(0.8),
		},
	},

	select: {
		initial: {
			y: -40,
			scale: 0.9,
			height: "0px",
			opacity: 0,
		},
		animate: {
			y: 0,
			scale: 1,
			height: "auto",
			opacity: 1,
			transition: {
				...selectTranition,
				staggerChildren: 0.07,
			},
		},

		exit: {
			y: -40,
			scale: 0.9,
			height: "0px",
			opacity: 0,
			transition: {
				...selectTranition,
				staggerChildren: 0.07,
				delay: 0.21,
			},
		},
	},
	rowItem: {
		initial: {
			y: -10,
			opacity: 0,
			scale: 0.9,
			transition: { staggerChildren: 0.06, ...boomTransition },
		},
		animate: {
			y: 0,
			scale: 1,
			opacity: 1,
			transition: { staggerChildren: 0.06, ...boomTransition },
		},
		exit: {
			y: 10,
			opacity: 0,
			scale: 0.9,
			transition: { staggerChildren: 0.06, ...boomTransition },
		},
	},

	staggeredFade: {
		initial: {
			y: -20,
			opacity: 0,
			transition: subtleTransition,
		},
		animate: {
			y: 0,
			scale: 1,
			opacity: 1,
			transition: subtleTransition,
		},
		exit: {
			y: 20,
			opacity: 0,
			transition: subtleTransition,
		},
	},
	dockedSidebarOpen: {
		initial: {
			opacity: 0,
			x: 100,
			transition: slideTransition,
		},
		animate: {
			x: 0,
			opacity: 1,
			transition: slideTransition,
		},
	},
	simpleFade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	staggerSimpleFade: ({ transitionProps }) => ({
		initial: { opacity: 0 },
		animate: { opacity: 1, transition: { ...transitionProps } },
		exit: { opacity: 0 },
	}),
};

export default anim;
