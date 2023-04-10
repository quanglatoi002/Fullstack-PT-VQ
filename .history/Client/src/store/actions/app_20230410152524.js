import actionTypes from './actionTypes';
// import { apiGetCategories, apiGetPrice } from '~/services/category';
import * as apis from '../../services';
export const getPrices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPrices();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRICES,
                prices: response?.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_PRICES,
                msg: response?.data.msg,
                prices: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: null,
        });
    }
};

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategories();
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
