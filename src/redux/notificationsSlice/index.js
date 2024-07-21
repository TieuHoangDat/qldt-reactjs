import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState: {
		notifications: [],
		createNotificationProgress: false,
		getAllNotificationsProgress: false,
		updateNotificationProgress: false,
		deleteNotificationProgress: false,
		error: false,
	},
	reducers: {
		createNotificationStart: (state) => {
			state.createNotificationProgress = true;
		},
		createNotificationSuccess: (state, action) => {
			state.notifications.push(action.payload);
			state.createNotificationProgress = false;
		},
		createNotificationFailure: (state) => {
			state.error = true;
			state.createNotificationProgress = false;
		},

		getAllNotificationsStart: (state) => {
			state.getAllNotificationsProgress = true;
		},
		getAllNotificationsSuccess: (state, action) => {
			state.notifications = action.payload;
			state.getAllNotificationsProgress = false;
		},
		getAllNotificationsFailure: (state) => {
			state.error = true;
			state.getAllNotificationsProgress = false;
		},

		updateNotificationStart: (state) => {
			state.updateNotificationProgress = true;
		},
		updateNotificationSuccess: (state, action) => {
			const index = state.notifications.findIndex(
				(notification) => notification._id === action.payload._id
			);
			state.notifications[index] = action.payload;
			state.updateNotificationProgress = false;
		},
		updateNotificationFailure: (state) => {
			state.error = true;
			state.updateNotificationProgress = false;
		},

		deleteNotificationStart: (state) => {
			state.deleteNotificationProgress = true;
		},
		deleteNotificationSuccess: (state, action) => {
			state.notifications = state.notifications.filter((notification) => notification._id !== action.payload);
			state.deleteNotificationProgress = false;
		},
		deleteNotificationFailure: (state) => {
			state.error = true;
			state.deleteNotificationProgress = false;
		},
	},
});

export const {
	createNotificationStart,
	createNotificationSuccess,
	createNotificationFailure,
	getAllNotificationsStart,
	getAllNotificationsSuccess,
	getAllNotificationsFailure,
	updateNotificationStart,
	updateNotificationSuccess,
	updateNotificationFailure,
	deleteNotificationStart,
	deleteNotificationSuccess,
	deleteNotificationFailure,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
