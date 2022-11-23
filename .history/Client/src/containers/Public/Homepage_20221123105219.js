import React from 'react';
import { text } from '~/utils/constant';
import { Province } from '~/components';
import { List, Pagination } from './index';

const Homepage = () => {
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
                    console.log( <Pagination />
                    );
                </div>
                <div className="w-[30%] flex flex-col gap-4 justify-start items-center border border-green-500">
                    Sidebar
                </div>
            </div>
        </div>
    );
};

export default Homepage;
