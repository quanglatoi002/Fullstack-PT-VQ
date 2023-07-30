import { memo } from 'react';

const SearchItem = ({ IconBefore, IconAfter, text, fontWeight, defaultText }) => {
    return (
        <div className="flex justify-between items-center bg-white py-[10px] pl-[10px] md:pr-[30px] pr-[20px] w-full rounded-md text-gray-400 text-sm leading-4">
            <div className="flex items-center gap-x-1 w-full">
                {IconBefore}
                <span
                    className={`${fontWeight && 'font-medium text-black'} w-[100px] ${
                        text ? 'font-medium text-black' : ''
                    } overflow-hidden text-ellipsis whitespace-nowrap`}
                >
                    {text || defaultText}
                </span>
            </div>
            {IconAfter}
        </div>
    );
};

export default memo(SearchItem);
