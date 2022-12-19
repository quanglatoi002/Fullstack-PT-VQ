import actionTypes from '../actions/actionTypes';
const initState = {
    isLoggedIn: false,
    token: null,
    msg: '',
    update: false,
};

// a function use update value again state
// not update direct value state vd: state.isLoggedIn = true, take value ...state back new update again value
const authReducer = (state = initState, action) => {
    // if side auth/actions get signal from use is dispatch({type : REGISTER_SUCCESS, data}) to reducers
    //reducer get request from user
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data, // <=>(data: response.data.token)
                msg: '',
            };
        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                msg: action.data,
                token: null,
                update: !state.update,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: '',
            };
        default:
            return state;
    }
};

export default authReducer;
