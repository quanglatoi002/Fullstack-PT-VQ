import actionTypes from './actionTypes';
import { apiGetCategories, apiGetPrice } from '~/services/category';

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apiGetCategories();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                msg: response.data.msg,
                categories: null,
            });
        }
        console.log(response);
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            posts: null,
        });
    }
};
