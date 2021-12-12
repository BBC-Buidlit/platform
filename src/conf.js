export const BASE_URL =
	process.env.REACT_APP_ENV === "development"
		? "http://localhost:9000/"
		: "http://localhost:9000/";

export const DISCORD_REDIRECT_URL = `${BASE_URL}auth/authorize/`;

export const FETCH_USER_URL = "user/";
export const FETCH_SERVERS_URL = "server/";

export const FETCH_OWNED_SERVERS_URL = "server/discord_owned/";

export const IMPORT_SERVERS_URL = (id) => `server/import/${id}`;

export const FETCH_SERVER_URL = (id) => `server/${id}`;
