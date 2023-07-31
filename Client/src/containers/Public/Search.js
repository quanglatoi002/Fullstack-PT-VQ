import { useState, useEffect, useCallback } from 'react';
import { SearchItem, Modal } from '~/components';
import icons from '~/utils/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
import { path } from '../../utils/constant';
import { getCodePrice, getCodes } from '../../utils/Common/getCodes';
const { BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line, MdOutlineHouseSiding, FiSearch } = icons;
const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isShowModal, setIsShowModal] = useState(false);
    const [content, setContent] = useState([]);
    const [name, setName] = useState('');
    const { provinces, areas, prices, categories } = useSelector((state) => state.app);
    const [queries, setQueries] = useState({});
    const [arrMinMax, setArrMinMax] = useState({});
    const [defaultText, setDefaultText] = useState('');

    useEffect(() => {
        // nếu như page không có tim-kiem
        if (!location?.pathname.includes(path.SEARCH)) {
            setArrMinMax({});
            setQueries({});
        }
    }, [location]);
    const handleShowModal = (content, name, defaultText) => {
        setContent(content);
        setName(name);
        setIsShowModal(true);
        setDefaultText(defaultText);
        setIsShowModal(true);
    };
    // nếu muốn đưa 1 hàm vào làm đối số của hàm khác thì chúng ta lên dùng useCallback để tránh bị gọi lại không cần thiết
    const handleSubmit = useCallback(
        (e, query, arrMaxMin) => {
            e.stopPropagation();
            setQueries((prev) => ({ ...prev, ...query }));
            setIsShowModal(false);
            arrMaxMin && setArrMinMax((prev) => ({ ...prev, ...arrMaxMin }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isShowModal, queries],
    );
    console.log(queries);
    console.log(Object.entries(queries).filter((item) => item[0].includes('Code')));
    const handleSearch = () => {
        //lọc ra các key có từ khóa 'Code' thì lấy
        const queryCodes = Object.entries(queries).filter((item) => item[0].includes('Code'));

        let objData = {};
        for (const [key, value] of queryCodes) {
            objData[key] = value;
        }
        //         .filter((item) => item[0].includes('Number') || item[0].includes('Code'))
        //         .filter((item) => item[1]);
        //     let queryCodesObj = {};
        //     queryCodes.forEach((item) => {
        //         queryCodesObj[item[0]] = item[1];
        //     });
        //     const queryText = Object.entries(queries).filter(
        //         (item) => !item[0].includes('Code') || !item[0].includes('Number'),
        //     );
        //     let queryTextObj = {};
        //     queryText.forEach((item) => {
        //         queryTextObj[item[0]] = item[1];
        //     });
        //     let titleSearch = `${queryTextObj.category ? queryTextObj.category : 'Cho thuê tất cả'} ${
        //         queryTextObj.province ? `tỉnh ${queryTextObj.province}` : ''
        //     } ${queryTextObj.price ? `giá ${queryTextObj.price}` : ''} ${
        //         queryTextObj.area ? `diện tích ${queryTextObj.area}` : ''
        //     } `;
        //     navigate(
        //         {
        //             pathname: path.SEARCH,
        //             search: createSearchParams(queryCodesObj).toString(),
        //         },
        //         { state: { titleSearch } },
        //     );
    };
    return (
        <>
            <div className="max-w-1100 w-full mt-3 lg:h-[55px] p-[10px] bg-[#febb02] rounded-lg flex md:flex-row flex-col items-center justify-around gap-2 ">
                <span
                    onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')}
                    className="flex-1 cursor-pointer"
                >
                    <SearchItem
                        IconBefore={<MdOutlineHouseSiding />}
                        fontWeight
                        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                        text={queries.category}
                        defaultText={'Tìm tất cả'}
                    />
                </span>
                <span
                    onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')}
                    className="flex-1 cursor-pointer"
                >
                    <SearchItem
                        IconBefore={<HiOutlineLocationMarker />}
                        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                        text={queries.province}
                        defaultText={'Toàn quốc'}
                    />
                </span>
                <span onClick={() => handleShowModal(prices, 'price', 'Chọn giá')} className="flex-1 cursor-pointer">
                    <SearchItem
                        IconBefore={<TbReportMoney />}
                        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                        text={queries.price}
                        defaultText={'Chọn giá'}
                    />
                </span>
                <span
                    onClick={() => handleShowModal(areas, 'area', 'Chọn diện tích')}
                    className="flex-1 cursor-pointer"
                >
                    <SearchItem
                        IconBefore={<RiCrop2Line />}
                        IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
                        text={queries.area}
                        defaultText={'Chọn diện tích'}
                    />
                </span>
                <button
                    type="button"
                    onClick={handleSearch}
                    className="outline-none flex-1 py-2 px-4 bg-[#0071c2] text-[#fff]  border-[#0071c2] rounded-md flex items-center justify-center gap-1 text-sm"
                >
                    <FiSearch />
                    Tìm kiếm
                </button>
            </div>
            {isShowModal && (
                <Modal
                    handleSubmit={handleSubmit}
                    queries={queries}
                    arrMinMax={arrMinMax}
                    content={content}
                    setIsShowModal={setIsShowModal}
                    name={name}
                    defaultText={defaultText}
                />
            )}
        </>
    );
};

export default Search;
