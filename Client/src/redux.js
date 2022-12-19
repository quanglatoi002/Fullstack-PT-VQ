import rootReducer from './store/reducers/rootReducer';
import persistStore from 'redux-persist/es/persistStore';
import { legacy_createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // thunk allow call api while dispath 1 ac, side client with server will help run some functions react between redux

const reduxStore = () => {
    const store = legacy_createStore(rootReducer, applyMiddleware(thunk)); // create store
    const persistor = persistStore(store); // save up localStorage

    return { store, persistor };
};

export default reduxStore;
