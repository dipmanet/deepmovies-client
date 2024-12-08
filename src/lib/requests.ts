import axios, { AxiosError } from "axios";
// import { toast } from "sonner";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
export const VIDEO_URL = import.meta.env.VITE_VIDEO_URL;
export const AuthorizationToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const https = axios.create({
	baseURL: BASE_URL,
	responseType: "json",
});

function getHeaders(isMultipart = false) {
	return {
		"Content-Type": isMultipart ? "multipart/form-data" : "application/json",
		Authorization: `Bearer ${AuthorizationToken}`,
	};
}

function get(url: string, params: object = {}) {
	return https
		.get(url, {
			headers: getHeaders(),
			params,
		})
		.then((res) => res.data)
		.catch((err) => handleRequestError(err));
}
function post(url: string, data: object, isMultipart = false) {
	return https
		.post(url, data, {
			headers: getHeaders(isMultipart),
		})
		.then((res) => res.data)
		.catch((err) => handleRequestError(err));
}
function put(url: string, data: object, isMultipart = false) {
	return https
		.put(url, data, {
			headers: getHeaders(isMultipart),
		})
		.then((res) => res.data)
		.catch((err) => handleRequestError(err));
}
function patch(url: string, data: object, isMultipart = false) {
	return https
		.patch(url, data, {
			headers: getHeaders(isMultipart),
		})
		.then((res) => res.data)
		.catch((err) => handleRequestError(err));
}
function remove(url: string, isMultipart = false) {
	return https
		.delete(url, {
			headers: getHeaders(isMultipart),
		})
		.then((res) => res.data)
		.catch((err) => handleRequestError(err));
}

function handleRequestError(err: AxiosError) {
	// toast.error(`Error:\n`, err);
	console.error("Request Error", err);
}
export default {
	post,
	get,
	remove,
	put,
	patch,
};
