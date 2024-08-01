import axios from "axios";
import { toast } from "react-toastify";

// let token = null;
// const root = JSON.parse(window.localStorage.getItem("persist:root"));

// if (root) {
// 	const { auth } = root;
// 	const { user } = JSON.parse(auth);
// 	if (user) token = user.token;
// }

let token = localStorage.getItem('access_token');

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: token ? `Bearer ${token}` : '',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
	  return response;
	},
	async (error) => {
		console.log("ok")
	  const originalRequest = error.config;
	  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
		try {
			console.log("ok1") //
		  const newAccessToken = await refreshAccessToken();
		  axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
		  originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
		  return axiosInstance(originalRequest);
		} catch (refreshError) {
		  console.error('Unable to refresh token', refreshError);
		  toast.error('Session expired. Please log in again.');
		  window.location.href = '/login'; // Redirect to login page
		  return Promise.reject(refreshError);
		}
	  }
	  return Promise.reject(error);
	}
);

const refreshAccessToken = async () => {
	const refresh_token = localStorage.getItem('refresh_token');
	if (!refresh_token) {
		throw new Error('No refresh token available');
	}
	const response = await axiosInstance.post('/auth/refresh', { refresh_token });
	const { access_token } = response.data;
	console.log(access_token) //
	localStorage.setItem('access_token', access_token);
	return access_token;
};

export default axiosInstance;
