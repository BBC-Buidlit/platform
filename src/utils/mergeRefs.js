const mergeRefs =
	(...refs) =>
	(el) => {
		refs.forEach((ref) => {
			if (!ref) return;
			if (typeof ref === "function") {
				ref(el);
			} else {
				ref.current = el;
			}
		});
	};

export default mergeRefs;
