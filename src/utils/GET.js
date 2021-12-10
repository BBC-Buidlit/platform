const GET = (key) => {
	const params = new URLSearchParams(window.location.search);
	return params.get(key);
};

export const GETAll = () => {
	const search = window.location.search;
	const params = new URLSearchParams(search);
	const entries = params.entries();
	const result = {};
	for (const [key, value] of entries) {
		result[key] = value;
	}
	return result;
};

export const encodeObject = (object) => {
	if (!object) return "";

	return Object.entries(object).reduce((result, [key, value]) => {
		return `${result}&${encodeURIComponent(key)}=${encodeURIComponent(
			value
		)}`;
	}, "");
};

export default GET;
