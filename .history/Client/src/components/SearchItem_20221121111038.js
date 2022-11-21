import { memo } from 'react';

const SearchItem = ({ IconBefore, IconAfter, text, fontWeight }) => {
    return (
        <div className="flex justify-between items-center bg-white py-[10px] pl-[10px] md:pr-[30px] pr-[20px] w-full rounded-md text-gray-400 text-sm leading-4">
            <div className="flex items-center gap-x-1 w-full">
                {IconBefore}
                <span className={`${fontWeight && 'font-bold text-black'} overflow-hidden  whitespace-nowrap `}>
                    {text}
                </span>
            </div>
            {IconAfter}
        </div>
    );
};

export default memo(SearchItem);
