import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

export const createNotification = async (notification, dispatch) => {
	dispatch(actions.createNotificationStart());
	try {
		const { data } = await axiosInstance.post("/notifications", notification);
		dispatch(actions.createNotificationSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.createNotificationFailure());
		return false;
	}
};

export const getAllNotifications = async (dispatch) => {
	dispatch(actions.getAllNotificationsStart());
	try {
		const { data } = await axiosInstance.get("/notifications");
		dispatch(actions.getAllNotificationsSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllNotificationsFailure());
		return false;
	}
};

export const updateNotification = async (id, notification, dispatch) => {
	dispatch(actions.updateNotificationStart());
	try {
		const { data } = await axiosInstance.put(`/notifications/${id}`, notification);
		dispatch(actions.updateNotificationSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateNotificationFailure());
		return false;
	}
};

export const deleteNotification = async (id, dispatch) => {
	dispatch(actions.deleteNotificationStart());
	try {
		const { data } = await axiosInstance.delete(`/notifications/${id}`);
		dispatch(actions.deleteNotificationSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteNotificationFailure());
		return false;
	}
};
