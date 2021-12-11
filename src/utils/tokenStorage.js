const tokenStorage = {
	ACCESS_TOKEN_KEY: "accessToken",
	REFRESH_TOKEN_KEY: "refreshToken",

	get() {
		const res = {};
		res.accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY, null);
		return res;
	},

	set(accessToken = null) {
		if (accessToken && typeof accessToken === "string") {
			localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
		}
	},
	clear() {
		localStorage.clear();
	},
};

export default tokenStorage;
