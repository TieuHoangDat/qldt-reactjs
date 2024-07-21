import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import usersReducer from "./usersSlice";
import coursesReducer from "./coursesSlice"; // them
import notificationsReducer from "./notificationsSlice"; // them
import termsReducer from "./termsSlice"; // them
import groupsReducer from "./groupsSlice";

const reducers = combineReducers({
	auth: authReducer,
	users: usersReducer,
	courses: coursesReducer, // them
	groups: groupsReducer, // them
	notifications: notificationsReducer, // them
	terms: termsReducer, // them
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
