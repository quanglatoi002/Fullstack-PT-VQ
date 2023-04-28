import { useState, useEffect } from 'react';
import icons from '../utils/icons';

const { GrLinkPrevious } = icons;
const Modal = ({ setIsShowModal, content, name }) => {
    const [presentOne, setPresentOne] = useState(0);
    const [presentTwo, setPresentTwo] = useState(100);

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
    const handleClickStack = (e) => {
        const stackEl = document.getElementById('track');
        // lấy toàn bộ vị trí đang đứng của event được xử lý
        const stackRect = stackEl.getBoundingClientRect();
        // vd ở đây e.clientX = (340 - 311)/167 lúc này chúng ta sẽ tìm ra được %
        let percent = Math.round(((e.clientX - stackRect.left) * 100) / stackRect.width);
        console.log(percent, 1);
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
    console.log(convert100toTarget(11));
    return (
        <div
            onClick={() => {
                setIsShowModal(false);
            }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center"
        >
            <div onClick={(e) => e.stopPropagation()} className="w-1/3 bg-white rounded-md">
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
                                {`Từ ${presentOne <= presentTwo ? presentOne : presentTwo} - ${
                                    presentTwo > presentOne ? presentTwo : presentOne
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
                                onChange={(e) => setPresentOne(e.target.value)}
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                max="100"
                                min="0"
                                step="1"
                                type="range"
                                //trước tiên đặt giá trị để set cứng vị trí, ở lúc này không thể kéo được thang range cho đến khi sử dụng onChange để bắt lấy sự thay đổi giá trị ban đầu và set kết quả đó vào setPresentOne
                                value={presentOne}
                            />
                            <input
                                onChange={(e) => setPresentTwo(e.target.value)}
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
