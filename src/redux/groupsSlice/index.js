import { createSlice } from "@reduxjs/toolkit";

export const groupsSlice = createSlice({
	name: "groups",
	initialState: {
		groups: [],
		createGroupProgress: false,
		getAllGroupsProgress: false,
		updateGroupProgress: false,
		deleteGroupProgress: false,
		error: false,
	},
	reducers: {
		createGroupStart: (state) => {
			state.createGroupProgress = true;
		},
		createGroupSuccess: (state, action) => {
			state.groups.push(action.payload);
			state.createGroupProgress = false;
		},
		createGroupFailure: (state) => {
			state.error = true;
			state.createGroupProgress = false;
		},

		getAllGroupsStart: (state) => {
			state.getAllGroupsProgress = true;
		},
		getAllGroupsSuccess: (state, action) => {
			state.groups = action.payload;
			state.getAllGroupsProgress = false;
		},
		getAllGroupsFailure: (state) => {
			state.error = true;
			state.getAllGroupsProgress = false;
		},

		updateGroupStart: (state) => {
			state.updateGroupProgress = true;
		},
		updateGroupSuccess: (state, action) => {
			const index = state.groups.findIndex(
				(group) => group._id === action.payload._id
			);
			state.groups[index] = action.payload;
			state.updateGroupProgress = false;
		},
		updateGroupFailure: (state) => {
			state.error = true;
			state.updateGroupProgress = false;
		},

		deleteGroupStart: (state) => {
			state.deleteGroupProgress = true;
		},
		deleteGroupSuccess: (state, action) => {
			state.groups = state.groups.filter((group) => group._id !== action.payload);
			state.deleteGroupProgress = false;
		},
		deleteGroupFailure: (state) => {
			state.error = true;
			state.deleteGroupProgress = false;
		},
	},
});

export const {
	createGroupStart,
	createGroupSuccess,
	createGroupFailure,
	getAllGroupsStart,
	getAllGroupsSuccess,
	getAllGroupsFailure,
	updateGroupStart,
	updateGroupSuccess,
	updateGroupFailure,
	deleteGroupStart,
	deleteGroupSuccess,
	deleteGroupFailure,
} = groupsSlice.actions;

export default groupsSlice.reducer;
