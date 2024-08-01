import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { loginStart, loginSuccess, loginFailure } from "./index";

const apiUrl = process.env.REACT_APP_API_URL + "/auth/login";

export const login = async (user, dispatch) => {
	dispatch(loginStart());
	try {
		const url = apiUrl;
		const { data } = await axios.post(url, user);
		console.log(data)
		const decodeData = jwt_decode(data.access_token);

		localStorage.setItem('access_token', data.access_token);
    	localStorage.setItem('refresh_token', data.refresh_token);

		toast.success(data.message);
		dispatch(loginSuccess({ ...decodeData, token: data.access_token }));
		window.location = "/";
	} catch (error) {
		dispatch(loginFailure());
		if (error.response.status >= 400 && error.response.status < 500) {
			toast.error(error.response.data.message);
		}
	}
};
