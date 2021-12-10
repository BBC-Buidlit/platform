import axios from "axios";
import tokenStorage from "./tokenStorage";
import { BASE_URL } from "../conf";

const createApiAxios = () => {
	const apiAxios = axios.create({
		baseURL: BASE_URL,
	});

	apiAxios.interceptors.request.use(async (config) => {
		const { accessToken } = tokenStorage.get();
		if (!accessToken) {
			tokenStorage.clear();
			return Promise.reject({ logout: true });
		}
		let token = accessToken;

		config.headers.Authorization = `${token}`;
		return config;
	});

	apiAxios.interceptors.response.use(
		async (response) => response,
		(error) => {
			if (error.response && error.response.status === 401) {
				tokenStorage.clear();
			}
			return Promise.reject(error);
		}
	);

	return apiAxios;
};

export default createApiAxios;
