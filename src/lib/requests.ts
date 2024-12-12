import axios, { AxiosError } from "axios";
import { toast } from "sonner";

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

function handleRequestError(err: AxiosError<any>) {
	toast.error(`${err?.message ?? "Network Error"}`);
	throw new Error(err?.message);
	const abc = {
		message: "Network Error",
		name: "AxiosError",
		stack:
			"AxiosError: Network Error\n at XMLHttpRequest.handleError (http://localhost:5173/node_modules/.vite/deps/axios.js?v=48f1632c:1596:14)\n at Axios.request (http://localhost:5173/node_modules/.vite/deps/axios.js?v=48f1632c:2124:41)",
		config: {
			transitional: {
				silentJSONParsing: true,
				forcedJSONParsing: true,
				clarifyTimeoutError: false,
			},
			adapter: ["xhr", "http", "fetch"],
			transformRequest: [null],
			transformResponse: [null],
			timeout: 0,
			xsrfCookieName: "XSRF-TOKEN",
			xsrfHeaderName: "X-XSRF-TOKEN",
			maxContentLength: -1,
			maxBodyLength: -1,
			env: {},
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGM1NzdiOGI4ODcwMzkwN2JiODIxZTI3Y2E5ZmRjZCIsIm5iZiI6MTY4NTU5Mjk3Ni42NTkwMDAyLCJzdWIiOiI2NDc4MWI5MDkzODI4ZTAxMTYyMmU0MjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._2vOZTtZr0dFKAiKTuH5el68oAwB567uMxOFEjHWnhc",
			},
			baseURL: "https://api.themoviedb.org/",
			responseType: "json",
			params: {},
			method: "get",
			url: "/3/genre/movie/list",
		},
		code: "ERR_NETWORK",
	};
}
export default {
	post,
	get,
	remove,
	put,
	patch,
};
