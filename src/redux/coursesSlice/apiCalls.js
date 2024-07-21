import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

export const createCourse = async (course, dispatch) => {
	dispatch(actions.createCourseStart());
	try {
		const { data } = await axiosInstance.post("/courses", course);
		dispatch(actions.createCourseSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.createCourseFailure());
		toast.success('Mã môn học đã tồn tại');
		return false;
	}
};

export const getAllCourses = async (dispatch) => {
	dispatch(actions.getAllCoursesStart());
	try {
		const { data } = await axiosInstance.get("/courses");
		dispatch(actions.getAllCoursesSuccess(data.data));
		return true;
	} catch (error) {
		dispatch(actions.getAllCoursesFailure());
		return false;
	}
};

export const updateCourse = async (id, course, dispatch) => {
	dispatch(actions.updateCourseStart());
	try {
		const { data } = await axiosInstance.put(`/courses/${id}`, course);
		dispatch(actions.updateCourseSuccess(data.data));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.updateCourseFailure());
		return false;
	}
};

export const deleteCourse = async (id, dispatch) => {
	dispatch(actions.deleteCourseStart());
	try {
		const { data } = await axiosInstance.delete(`/courses/${id}`);
		dispatch(actions.deleteCourseSuccess(id));
		toast.success(data.message);
		return true;
	} catch (error) {
		dispatch(actions.deleteCourseFailure());
		return false;
	}
};
