export const BASE_URL =
	process.env.REACT_APP_ENV === "development"
		? "http://localhost:9000/"
		: "http://localhost:9000/";

export const TOKEN_REFRESH_DELTA = 5;

export const FETCH_USER_URL = "user/";
export const DISCORD_REDIRECT_URL = `${BASE_URL}auth/authorize/`;
