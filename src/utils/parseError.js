const parseError = (error) => {
	if (error && error.response) {
		if (error.response.status / 100 >= 5) {
			return `An unknown error occurred (${error.response.status})`;
		}
		if (typeof error.response.data === "string") {
			return error.response.data.length < 100
				? error.response.data
				: `An unknown error occurred (${error.response.status})`;
		} else if (Array.isArray(error.response.data)) {
			return error.response.data.join(",");
		} else {
			return Object.entries(error.response.data)
				.map((err) => {
					if (Array.isArray(err[1]) || typeof err[1] !== "object") {
						return err[1];
					}
					if (typeof err[1] === "object") {
						return (
							err[1].error ||
							"An error occurred, please try again later"
						);
					}
					return "";
				})
				.join(", ");
		}
	} else {
		return "Could not connect to the internet. Try again later.";
	}
};

export default parseError;
