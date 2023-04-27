import { useState } from 'react';
import { SearchItem, Modal } from '~/components';
import icons from '~/utils/icons';
import { useSelector } from 'react-redux';

const { BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons;
const Search = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [content, setContent] = useState([]);
    const [name, setName] = useState('');
    const { provinces, areas, prices, categories } = useSelector((state) => state.app);

    const handleShowModal = (content, name) => {
        setContent(content);
        setName(name);
        setIsShowModal(true);
    };
    return (
        <>
            <div className="max-w-1100 w-full mt-3 lg:h-[55px] p-[10px] bg-[#febb02] rounded-lg flex md:flex-row flex-col items-center justify-around gap-2 ">
                <span onClick={() => handleShowModal(categories, 'category')} className="flex-1 cursor-pointer">
                    <SearchItem
                        IconBefore={<MdOutlineHouseSiding />}
                        fontWeight
                        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                        text="Phòng trọ, nhà trọ"
                    />
                </span>
                <span onClick={() => handleShowModal(provinces, 'province')} className="flex-1 cursor-pointer">
                    <SearchItem
                        IconBefore={<HiOutlineLocationMarker />}
                        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                        text="Toàn quốc"
                    />
                </span>
                <span onClick={() => handleShowModal(prices, 'price')} className="flex-1 cursor-pointer">
                    <SearchItem
                        IconBefore={<TbReportMoney />}
                        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                        text="Chọn giá"
                    />
                </span>
                <span onClick={() => handleShowModal(areas, 'area')} className="flex-1 cursor-pointer">
                    <SearchItem
                        IconBefore={<RiCrop2Line />}
                        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                        text="Chọn diện tích"
                    />
                </span>
                <button
                    type="button"
                    className="outline-none flex-1 py-2 px-4 bg-[#0071c2] text-[#fff]  border-[#0071c2] rounded-md flex items-center justify-center gap-1 text-sm"
                >
                    <FiSearch />
                    Tìm kiếm
                </button>
            </div>
            {isShowModal && <Modal content={content} setIsShowModal={setIsShowModal} name={name} />}
        </>
    );
};

export default Search;
