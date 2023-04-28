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
                    <div className="p-12">
                        <div className="flex flex-col items-center justify-center relative">
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
                                step="5"
                                type="range"
                                //trước tiên đặt giá trị để set cứng vị trí, ở lúc này không thể kéo được thang range cho đến khi sử dụng onChange để bắt lấy sự thay đổi giá trị ban đầu và set kết quả đó vào setPresentOne
                                value={presentOne}
                            />
                            <input
                                onChange={(e) => setPresentTwo(e.target.value)}
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                max="100"
                                min="0"
                                step="5"
                                type="range"
                                value={presentTwo}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
