import { createSlice } from "@reduxjs/toolkit";

export const coursesSlice = createSlice({
	name: "courses",
	initialState: {
		courses: [],
		createCourseProgress: false,
		getAllCoursesProgress: false,
		updateCourseProgress: false,
		deleteCourseProgress: false,
		error: false,
	},
	reducers: {
		createCourseStart: (state) => {
			state.createCourseProgress = true;
		},
		createCourseSuccess: (state, action) => {
			state.courses.push(action.payload);
			state.createCourseProgress = false;
		},
		createCourseFailure: (state) => {
			state.error = true;
			state.createCourseProgress = false;
		},

		getAllCoursesStart: (state) => {
			state.getAllCoursesProgress = true;
		},
		getAllCoursesSuccess: (state, action) => {
			state.courses = action.payload;
			state.getAllCoursesProgress = false;
		},
		getAllCoursesFailure: (state) => {
			state.error = true;
			state.getAllCoursesProgress = false;
		},

		updateCourseStart: (state) => {
			state.updateCourseProgress = true;
		},
		updateCourseSuccess: (state, action) => {
			const index = state.courses.findIndex(
				(course) => course._id === action.payload._id
			);
			state.courses[index] = action.payload;
			state.updateCourseProgress = false;
		},
		updateCourseFailure: (state) => {
			state.error = true;
			state.updateCourseProgress = false;
		},

		deleteCourseStart: (state) => {
			state.deleteCourseProgress = true;
		},
		deleteCourseSuccess: (state, action) => {
			state.courses = state.courses.filter((course) => course._id !== action.payload);
			state.deleteCourseProgress = false;
		},
		deleteCourseFailure: (state) => {
			state.error = true;
			state.deleteCourseProgress = false;
		},
	},
});

export const {
	createCourseStart,
	createCourseSuccess,
	createCourseFailure,
	getAllCoursesStart,
	getAllCoursesSuccess,
	getAllCoursesFailure,
	updateCourseStart,
	updateCourseSuccess,
	updateCourseFailure,
	deleteCourseStart,
	deleteCourseSuccess,
	deleteCourseFailure,
} = coursesSlice.actions;

export default coursesSlice.reducer;
