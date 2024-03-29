import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';
//
import { apiGetCategories } from '~/services/category';
import { formatVietnameseToString } from '~/utils/Common/formatVietnameseToString';

const notActive = 'hover:bg-secondary2 h-full flex items-center px-4 bg-secondary1';
const active = 'hover:bg-secondary2 h-full flex items-center  px-4 bg-secondary2';

const Navigation = ({ isAdmin }) => {
    // const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.app);

    useEffect(() => {
        // const fetchCategories = async () => {
        //     const response = await apiGetCategories();
        //     if (response?.data.err === 0) {
        //         setCategories(response.data.response);
        //     }
        // };
        // fetchCategories();
        dispatch(actions.getCategories());
    }, [dispatch]);
    return (
        <div
            className={`w-full md:flex hidden ${
                isAdmin ? 'justify-start' : 'lg:justify-center justify-start'
            } items-center h-[40px] text-white bg-secondary1`}
        >
            <div className="max-w-1100 lg:odd:mr-[30.5rem] lg:mx-0 h-full flex items-center text-sm font-medium ">
                <NavLink to={`/`} className={({ isAcctive }) => (isAcctive ? active : notActive)}>
                    Trang chủ
                </NavLink>
                {categories.length > 0 &&
                    categories.map((item) => {
                        return (
                            <div key={item.code} className="h-full flex justify-center items-center">
                                <NavLink
                                    to={`/${formatVietnameseToString(item.value)}`}
                                    className={({ isAcctive }) => (isAcctive ? active : notActive)}
                                >
                                    {item.value}
                                </NavLink>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Navigation;
