import React from 'react';
import { text } from '~/utils/constant';
import { Province, ItemSidebar } from '~/components';
import { List, Pagination } from './index';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Homepage = () => {
    const [params] = useSearchParams();
    const { categories, prices } = useSelector((state) => state.app);
    return (
        <div className="w-full border border-red-500 flex flex-col gap-[15px] ">
            <div>
                <h1 className="text-3xl font-bold mb-[5px]">{text.HOME_TITLE}</h1>
                <p className="text-base text-[#65676b]">{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className="w-full flex gap-4">
                <div className="w-[70%]">
                    <List page={params.get('page')} />
                    <Pagination />
                </div>
                <div className="w-[30%] flex flex-col gap-4 items-center border border-green-500">
                    <ItemSidebar content={categories} title="Danh sách cho thuê" />
                    <ItemSidebar content={prices} title="Xem theo giá" />
                    <ItemSidebar title="Xem theo diện tích" />
                </div>
            </div>
        </div>
    );
};

export default Homepage;
