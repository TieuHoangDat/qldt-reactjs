import axiosInstance from "../axiosInstance";
import * as actions from "./index";

export const getAllTerms = async (id, dispatch) => {
  dispatch(actions.getAllTermsStart());
  try {
    const { data } = await axiosInstance.get(`/show_grade/${id}`);
    dispatch(actions.getAllTermsSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getAllTermsFailure());
    return false;
  }
};
