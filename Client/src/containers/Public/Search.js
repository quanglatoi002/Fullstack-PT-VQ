import React from 'react';
import { SearchItem } from '~/components';
import icons from '~/utils/icons';

const { BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons;
const Search = () => {
    return (
        <div className="max-w-1100 w-full mt-3 lg:h-[55px] p-[10px] bg-[#febb02] rounded-lg flex md:flex-row flex-col items-center justify-around gap-2 ">
            <SearchItem
                IconBefore={<MdOutlineHouseSiding />}
                fontWeight
                IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                text="Phòng trọ, nhà trọ"
            />
            <SearchItem
                IconBefore={<HiOutlineLocationMarker />}
                IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                text="Toàn quốc"
            />
            <SearchItem
                IconBefore={<TbReportMoney />}
                IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                text="Chọn giá"
            />
            <SearchItem
                IconBefore={<RiCrop2Line />}
                IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                text="Chọn diện tích"
            />
            <button
                type="button"
                className="outline-none py-2 px-4 w-full bg-[#0071c2] text-[#fff]  border-[#0071c2] rounded-md flex items-center justify-center gap-1 text-sm"
            >
                <FiSearch />
                Tìm kiếm
            </button>
        </div>
    );
};

export default Search;
