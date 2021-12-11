export const BASE_URL =
	process.env.REACT_APP_ENV === "development"
		? "http://localhost:9000/"
		: "http://localhost:9000/";

export const DISCORD_REDIRECT_URL = `${BASE_URL}auth/authorize/`;

export const FETCH_USER_URL = "user/";
export const FETCH_SERVERS_URL = "user/guilds";
