import authReducer from './authReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';

const commonConfig = {
    storage,
    stateReconciler: authMergeLevel2,
};

//data will post up localStorage
const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token'], //display whitelist
};

// combine the reducer together
const rootReducer = combineReducers({
    //Redux persist allowing to save the redux store in the localStorage of you browser
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
});

export default rootReducer;
