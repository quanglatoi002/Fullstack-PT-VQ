import { Input } from 'postcss';
import React from 'react';
import icons from '../utils/icons';

const { GrLinkPrevious } = icons;
const Modal = ({ setIsShowModal, content, name }) => {
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
                <div className="p-4 flex flex-col ">
                    {content?.map((item) => (
                        <span key={item.code} className="flex items-center py-2 gap-2 border-b border-gray-200">
                            <input type="radio" id={item.code} name={name} value={item.code} />
                            <label htmlFor={item.code}>{item.value}</label>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
