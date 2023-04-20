import { useEffect } from 'react';
import { text } from '~/utils/constant';
import { Province, ItemSidebar } from '~/components';
import { List, Pagination } from './index';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

const Homepage = () => {
    const dispatch = useDispatch();
    const [params] = useSearchParams();
    const { categories, prices, areas } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(actions.getPrices());
        dispatch(actions.getAreas());
    }, []);
    console.log(prices);

    return (
        <div className="w-full border border-red-500 flex flex-col gap-[15px] ">
            <div>
                <h1 className="text-3xl font-bold mb-[5px]">{text.HOME_TITLE}</h1>
                <p className="text-base text-[#65676b]">{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className="w-full flex gap-4">
                <div className="w-[70%]">
                    <List />
                    <Pagination page={params.get('page')} />
                </div>
                <div className="w-[30%] flex flex-col gap-4 items-center border border-green-500">
                    <ItemSidebar content={categories} title="Danh sách cho thuê" />
                    <ItemSidebar isDouble type="priceCode" content={prices} title="Xem theo giá" />
                    <ItemSidebar isDouble type="areaCode" content={areas} title="Xem theo diện tích" />
                </div>
            </div>
        </div>
    );
};

export default Homepage;
