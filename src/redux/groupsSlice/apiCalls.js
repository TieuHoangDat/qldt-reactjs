import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

export const createGroup = async (group, dispatch) => {
	dispatch(actions.createGroupStart());
	try {
		const { data } = await axiosInstance.post("/groups", group);
		dispatch(actions.createGroupSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.createGroupFailure());
		return false;
	}
};

export const getAllGroupsByCourseId = async (id, dispatch) => {
	dispatch(actions.getAllGroupsStart());
	try {
		const { data } = await axiosInstance.get(`/groups/courseId/${id}`);
		dispatch(actions.getAllGroupsSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllGroupsFailure());
		return false;
	}
};

export const updateGroup = async (id, group, dispatch) => {
	dispatch(actions.updateGroupStart());
	try {
		const { data } = await axiosInstance.put(`/groups/${id}`, group);
		dispatch(actions.updateGroupSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateGroupFailure());
		return false;
	}
};

export const deleteGroup = async (id, dispatch) => {
	dispatch(actions.deleteGroupStart());
	try {
		const { data } = await axiosInstance.delete(`/groups/${id}`);
		dispatch(actions.deleteGroupSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteGroupFailure());
		return false;
	}
};
