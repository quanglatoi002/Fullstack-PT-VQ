import authReducer from './authReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import appReducer from './appReducer';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

// const encryptForm = encryptTransform({
//     secretKey: process.env.REACT_APP_SECRET_KEY,
// });

const commonConfig = {
    storage,
    stateReconciler: authMergeLevel2,
};

//data will post up localStorage
const authConfig = {
    ...commonConfig,
    key: 'auth',
    // whitelist -->which reducer want save in persistence storage
    //blacklist --> which reducer not want save in persistence storage
    whitelist: ['isLoggedIn', 'token'], //display whitelist
    // transforms: [encryptForm],
};

// combine the reducer together
const rootReducer = combineReducers({
    //Redux persist allowing to save the redux store in the localStorage of you browser

    //When we config for primary 'auth' and only auth change then we can use persistReducer
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    post: postReducer,
    app: appReducer,
});

export default rootReducer;
