import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Navigation, Search } from './index';
import { Intro, Contact } from '../../components';

const Home = () => {
    return (
        <div className="w-full flex flex-col items-center border  bg-primary px-0.5">
            <Header />
            <Navigation />
            <Search />
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
