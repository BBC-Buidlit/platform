import decodeJWT from "./decodeJWT";
import { TOKEN_REFRESH_DELTA } from "../conf";

const tokenHasExpired = (token) => {
	const payload = decodeJWT(token);
	if (!payload || !payload.exp) {
		return true;
	}
	return payload.exp - Date.now() / 1000 < TOKEN_REFRESH_DELTA;
};

export default tokenHasExpired;
