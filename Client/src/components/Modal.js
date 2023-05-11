import { memo, useState, useEffect } from 'react';
import icons from '../utils/icons';
import { getNumbersPrice, getNumbersArea } from '../utils/Common/getNumbers';
const { GrLinkPrevious } = icons;
const Modal = ({ setIsShowModal, content, name, handleSubmit, queries, arrMinMax, defaultText }) => {
    const [activeEl, setActiveEl] = useState('');

    const [presentOne, setPresentOne] = useState(
        // tìm giá trị min max trong price
        name === 'price' && arrMinMax?.priceArr
            ? arrMinMax?.priceArr[0]
            : name === 'area' && arrMinMax?.areaArr
            ? arrMinMax?.areaArr[0]
            : 0,
    );
    const [presentTwo, setPresentTwo] = useState(
        name === 'price' && arrMinMax?.priceArr
            ? arrMinMax?.priceArr[1]
            : name === 'area' && arrMinMax?.areaArr
            ? arrMinMax?.areaArr[1]
            : 100,
    );

    useEffect(() => {
        const activesTrackEl = document.getElementById('track-active');
        //quy chế hoạt động của thanh kéo
        // khi ta kéo presentTwo sang bên trái và kéo qua presentOne thì lúc này chúng ta cần phải đổi giá trị lại cho nhau, lúc này ở vị trí left sẽ là presentTwo và bên phải là presentOne và ngược lại thì chỉ cần cho kq ngược lại với nhau là được
        if (activesTrackEl) {
            if (presentTwo <= presentOne) {
                activesTrackEl.style.left = `${presentTwo}%`;
                activesTrackEl.style.right = `${100 - presentOne}%`;
            } else {
                activesTrackEl.style.left = `${presentOne}%`;
                activesTrackEl.style.right = `${100 - presentTwo}%`;
            }
        }
    }, [presentOne, presentTwo]);

    //handle range change
    const handleClickStack = (e, value) => {
        const stackEl = document.getElementById('track');
        // lấy toàn bộ vị trí đang đứng của event được xử lý
        const stackRect = stackEl.getBoundingClientRect();
        // vd ở đây e.clientX = (340 - 311)/167 lúc này chúng ta sẽ tìm ra được %
        let percent = value ? value : Math.round(((e.clientX - stackRect.left) * 100) / stackRect.width, 0);
        // lấy giá trị tuyệt đối của cả 2 present nếu present nào có giá trị nhỏ hơn giá trị còn lại thì lúc nhấn chuột thì present ở bên nhỏ hơn sẽ phải di chuyển
        if (Math.abs(percent - presentOne) <= Math.abs(percent - presentTwo)) {
            setPresentOne(percent);
        } else setPresentTwo(percent);
    };
    //vd ta present lúc này = 30 * 1.5 = 50 / 5 = 10 * 5 = 50 / 10 = 5
    // 10% => 1.5
    // 1.5*10 = 15 / 5 = 3 du 0 => 3 * 5 / 10 = 1.5
    // 9 * 1.5 = 13.5 làm tròn lên 14 / 5 => 2 dư 4 lúc này chúng ta muốn loại bỏ kq số dư để nâng kq thêm 1 vậy lúc này kq ban đầu là 2 sẽ được nâng 3, 3 * 5 = 15 /10 => 1.5tr
    const convert100toTarget = (percent) => {
        return name === 'price'
            ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
            : name === 'area'
            ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
            : 0;
    };
    //convert Target to 100 vd 2 / 15
    const convertResultTo100 = (percent) => {
        let target = name === 'price' ? 15 : name === 'area' ? 90 : 1;
        return Math.floor((percent / target) * 100);
    };
    //handle
    const handleActive = (code, value) => {
        setActiveEl(code, value);
        // hiện tại có price và area lên cần phải ktra xem name hiện tại
        let arrMaxMin = name === 'price' ? getNumbersPrice(value) : getNumbersArea(value);
        // Có 2 trường hợp đặc biệt sẽ trả về 1 số(1 và 15 ở bên price và area(20 và 90)
        if (arrMaxMin.length === 1) {
            if (arrMaxMin[0] === 1) {
                setPresentOne(0);
                setPresentTwo(convertResultTo100(1));
            }
            if (arrMaxMin[0] === 20) {
                setPresentOne(0);
                setPresentTwo(convertResultTo100(20));
            }
            if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
                setPresentOne(100);
                setPresentTwo(100);
            }
        }
        if (arrMaxMin.length === 2) {
            setPresentOne(convertResultTo100(arrMaxMin[0]));
            setPresentTwo(convertResultTo100(arrMaxMin[1]));
        }
    };
    const handleBeforeSubmit = (e) => {
        let min = presentOne <= presentTwo ? presentOne : presentTwo;
        let max = presentOne <= presentTwo ? presentTwo : presentOne;
        let arrMinMax = [convert100toTarget(min), convert100toTarget(max)];
        // const gaps = name === 'price'
        //     ? getCodes(arrMinMax, content)
        //     : name === 'area' ? getCodesArea(arrMinMax, content) : []
        handleSubmit(
            e,
            {
                [`${name}Number`]: arrMinMax,
                [name]: `Từ ${convert100toTarget(min)} - ${convert100toTarget(max)} ${
                    name === 'price' ? 'triệu' : 'm2'
                }`,
            },
            {
                [`${name}Arr`]: [min, max],
            },
        );
    };
    return (
        <div
            onClick={() => {
                setIsShowModal(false);
            }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center"
        >
            <div onClick={(e) => e.stopPropagation()} className="lg:w-2/5 w-1/2 bg-white relative rounded-md">
                <div className="h-[45px] px-4 flex items-center border-b border-gray-200">
                    <span
                        className="cursor-pointer"
                        onClick={() => {
                            setIsShowModal(false);
                        }}
                    >
                        <GrLinkPrevious size={24} />
                    </span>
                </div>
                {(name === 'category' || name === 'province') && (
                    <div className="p-4 flex flex-col ">
                        {content?.map((item) => (
                            <span key={item.code} className="flex items-center py-2 gap-2 border-b border-gray-200">
                                <input type="radio" id={item.code} name={name} value={item.code} />
                                <label htmlFor={item.code}>{item.value}</label>
                            </span>
                        ))}
                    </div>
                )}
                {(name === 'price' || name === 'area') && (
                    <div className="p-12 py-20">
                        <div className="flex flex-col items-center justify-center relative">
                            <div className="z-30 absolute top-[-48px] font-medium text-xl text-orange-600">
                                {`Từ ${
                                    presentOne <= presentTwo
                                        ? convert100toTarget(presentOne)
                                        : convert100toTarget(presentTwo)
                                } - ${
                                    presentTwo >= presentOne
                                        ? convert100toTarget(presentTwo)
                                        : convert100toTarget(presentOne)
                                } triệu +`}
                            </div>
                            <div
                                onClick={handleClickStack}
                                id="track"
                                className="slider-track h-[5px] bg-gray-300 w-full absolute top-0 left-0 rounded-full"
                            ></div>
                            <div
                                onClick={handleClickStack}
                                id="track-active"
                                className="slider-track-active h-[5px] bg-orange-600 absolute top-0 left-0 rounded-full"
                            ></div>
                            <input
                                onChange={(e) => {
                                    setPresentOne(+e.target.value);
                                    activeEl && setActiveEl('');
                                }}
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                max="100"
                                min="0"
                                step="1"
                                type="range"
                                //trước tiên đặt giá trị để set cứng vị trí, ở lúc này không thể kéo được thang range cho đến khi sử dụng onChange để bắt lấy sự thay đổi giá trị ban đầu và set kết quả đó vào setPresentOne
                                value={presentOne}
                            />
                            <input
                                onChange={(e) => {
                                    setPresentOne(+e.target.value);
                                    activeEl && setActiveEl('');
                                }}
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                max="100"
                                min="0"
                                step="1"
                                type="range"
                                value={presentTwo}
                            />
                            <div className="absolute z-30 top-6 left-0 right-0 flex justify-between items-center">
                                <span
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClickStack(e, 0);
                                    }}
                                >
                                    0
                                </span>
                                <span
                                    className="mr-[-12px] cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        handleClickStack(e, 100);
                                    }}
                                >
                                    {name === 'price' ? '15 triệu +' : name === 'area' ? 'Trên 90 m2' : ''}
                                </span>
                            </div>
                        </div>
                        <div className="lg:mt-24 mt-16">
                            <h4 className="font-medium mb-4">Chọn nhanh:</h4>
                            <div className="flex gap-2 items-center flex-wrap w-full">
                                {content?.map((item) => {
                                    return (
                                        <button
                                            key={item.code}
                                            onClick={() => handleActive(item.code, item.value)}
                                            className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${
                                                item.code === activeEl ? 'bg-blue-500 text-white' : ''
                                            }`}
                                        >
                                            {item.value}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                {(name === 'price' || name === 'area') && (
                    <button
                        type="button"
                        className="w-full absolute bottom-0 bg-[#FFA500] py-2 font-medium rounded-bl-md rounded-br-md"
                        onClick={handleBeforeSubmit}
                    >
                        ÁP DỤNG
                    </button>
                )}
            </div>
        </div>
    );
};

export default memo(Modal);
