import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Navigation, Search } from './index';
import { Intro, Contact } from '../../components';
import { useEffect } from 'react';
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetCurrent } from '~/services/user';

const Home = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(actions.getPrices());
        dispatch(actions.getAreas());
        dispatch(actions.getProvinces());
    }, [dispatch]);

    useEffect(() => {
        setTimeout(() => {
            isLoggedIn && dispatch(actions.getCurrent());
        }, 100);
    }, [dispatch, isLoggedIn]);
    return (
        <div className="w-full flex flex-col items-center border  bg-primary px-0.5">
            <Header />
            <Navigation />
            {isLoggedIn && <Search />}
            <div className="max-w-1100 w-full flex flex-col items-start justify-start mt-3">
                <Outlet />
            </div>
            <Intro />
            <Contact />
            <div className="h-[500px]"></div>
        </div>
    );
};

export default Home;
