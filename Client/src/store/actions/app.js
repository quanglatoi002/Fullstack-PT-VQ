import actionTypes from './actionTypes';
// import { apiGetCategories, apiGetPrice } from '~/services/category';
import * as apis from '../../services';
export const getPrices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPrices();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRICES,
                prices: response?.data.response.sort((a, b) => {
                    return +a.order - +b.order;
                }),
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

export const getAreas = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAreas();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_AREAS,
                areas: response?.data.response.sort((a, b) => {
                    return +a.order - +b.order;
                }),
            });
        } else {
            dispatch({
                type: actionTypes.GET_AREAS,
                msg: response?.data.msg,
                areas: null,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICES,
            areas: null,
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
export const getProvinces = () => async (dispatch) => {
    try {
        const response = await apis.apiGetProvinces()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PROVINCES,
                provinces: response.data.response,
                msg: ''
            })
        } else {
            dispatch({
                type: actionTypes.GET_PROVINCES,
                msg: response.data.msg,
                provinces: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PROVINCES,
            provinces: null,
            msg: ''
        })
    }
}