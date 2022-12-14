import { apiRegister, apiLogin } from '~/services/auth';
import actionTypes from './actionTypes';

//often action will return object, after install Middleware will return one more function
//DISPATCH IS A FUNCTION AND GET PARAMETER IS ACTION VD: dispatch(actions)
export const register = (payload) => async (dispatch) => {
    try {
        // get result from authReducer
        const response = await apiRegister(payload);
        console.log(response);
        // if take data result will up authReducer
        if (response?.data.err === 0) {
            // side page auth/actions will get "data:payload" now this data get all data return side server
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token, //token take data side server through auth/services, then pass get data by "data:payload" --> response.data --> response.data.token(focus auth/services(server))
            });
        } else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null,
        });
    }
};
export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload);
        console.log(response);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token,
            });
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null,
        });
    }
};

export const logout = () => ({
    type: actionTypes.LOGOUT,
});
