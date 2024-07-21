import { createSlice } from "@reduxjs/toolkit";

export const termsSlice = createSlice({
  name: "terms",
  initialState: {
    terms: [],
    getAllTermsProgress: false,
    error: false,
  },
  reducers: {
    getAllTermsStart: (state) => {
      state.getAllTermsProgress = true;
    },
    getAllTermsSuccess: (state, action) => {
      state.terms = action.payload;
      state.getAllTermsProgress = false;
    },
    getAllTermsFailure: (state) => {
      state.error = true;
      state.getAllTermsProgress = false;
    },
  },
});

export const {
  getAllTermsStart,
  getAllTermsSuccess,
  getAllTermsFailure,
} = termsSlice.actions;

export default termsSlice.reducer;
