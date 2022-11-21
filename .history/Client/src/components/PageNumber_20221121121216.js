import { memo } from 'react';

const PageNumber = ({ number }) => {
    return (
        <div
            className="px-[18px] py-[15px] bg-white
           hover:bg-[#e13427] hover:text-white rounded-md "
        >
            {number}
        </div>
    );
};

export default memo(PageNumber);
