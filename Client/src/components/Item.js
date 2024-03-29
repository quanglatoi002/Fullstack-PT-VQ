import { memo, useState } from 'react';
import icons from '~/utils/icons';
import { useNavigate, Link } from 'react-router-dom';
import { formatVietnameseToString } from '~/utils/Common/formatVietnameseToString';

const indexs = [0, 1, 2, 3];

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons;

const Item = ({ images, user, title, star, description, attributes, address, id }) => {
    const [isHoverHeart, setIsHoverHeart] = useState(false);
    const navigate = useNavigate();

    const handleStar = (star) => {
        let stars = [];
        for (let i = 1; i <= +star; i++) stars.push(<GrStar className="star-item" size={18} color="yellow" />);
        return stars;
    };

    return (
        <div
            className="w-full flex border-t-[2px] 
        border-orange-600 py-4 "
        >
            <Link
                to={`chi-tiet/${formatVietnameseToString(title)}/${id}`}
                className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer"
            >
                {images.length > 0 &&
                    images
                        .filter((i, index) => indexs.some((i) => i === index))
                        ?.map((i, index) => {
                            return (
                                <img
                                    key={index}
                                    src={i}
                                    alt="preview"
                                    className="w-[47%] h-[120px] flex-shrink-0 object-cover"
                                />
                            );
                        })}

                <span className="absolute bottom-3 left-[8px] bg-bg-overlay-50 text-white px-1 rounded">{`${images.length} ảnh`}</span>
                <span>
                    <span
                        className="absolute bottom-1 right-[5px] text-white p-1 rounded text-[24px]"
                        onMouseEnter={() => {
                            setIsHoverHeart(true);
                        }}
                        onMouseLeave={() => setIsHoverHeart(false)}
                    >
                        {isHoverHeart ? <RiHeartFill size={24} color="red" /> : <RiHeartLine size={24} />}
                    </span>
                </span>
            </Link>
            <div className="w-3/5">
                <div className="flex justify-between gap-4 leading-[21px]">
                    <div
                        className="text-red-600 
                    font-medium"
                    >
                        {handleStar(+star).length > 0 &&
                            handleStar(+star).map((star, number) => {
                                return <span key={number}>{star}</span>;
                            })}
                        {title}
                    </div>
                    <div className="w-[10%] flex justify-end">
                        <BsBookmarkStarFill size={24} color="orange" />
                    </div>
                </div>
                <div className="my-2 flex items-center justify-between gap-3">
                    <span className="font-bold text-green-600 whitespace-nowrap overflow-hidden text-ellipsis">
                        {attributes?.price}
                    </span>
                    <span className="">{attributes?.acreage}</span>
                    <span className=" whitespace-nowrap overflow-hidden text-ellipsis">{`${
                        address.split(',')[address.split(',').length - 2]
                    }${address.split(',')[address.split(',').length - 1]}`}</span>
                </div>
                <p className="text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden">{description}</p>
                <div className="flex items-center my-5 justify-between">
                    <div className="flex flex-1 w-auto items-center gap-1">
                        <img
                            src="https://tse3.mm.bing.net/th?id=OIP.yyzxPFHGBsH0XTcrvzx8FgHaHa&pid=Api&P=0"
                            alt="avatar"
                            className="w-[30px] h-[30px] object-cover flex-shrink-0 rounded-full"
                        ></img>
                        <p className="">{user?.name}</p>
                    </div>
                    <div className="flex flex-1 items-center ml-auto gap-1.5">
                        <button type="button" className="bg-blue-700 text-white ml-auto rounded-md lg:p-1 p-0.5">
                            {`Gọi ${+user?.phone}`}
                        </button>
                        <button type="button" className="lg:p-1 p-0.5 border border-blue-700 text-blue-700 rounded-md">
                            Nhắn Zalo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Item);

// import React, { memo, useState } from 'react';
// import icons from '~/utils/icons';
// import { useNavigate, Link } from 'react-router-dom';
// import { formatVietnameseToString } from '~/utils/Common/formatVietnameseToString';

// const indexs = [0, 1, 2, 3];

// const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons;

// const Item = ({ images, user, title, star, description, attributes, address, id }) => {
//     const [isHoverHeart, setIsHoverHeart] = useState(false);

//     const handleStar = (star) => {
//         let stars = [];
//         for (let i = 1; i <= +star; i++) stars.push(<GrStar className="star-item" size={18} color="yellow" />);
//         return stars;
//     };
//     return (
//         <div className="w-full flex border-t border-orange-600 py-4">
//             <Link
//                 to={`chi-tiet/${formatVietnameseToString(title)}/${id}`}
//                 className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer"
//             >
//                 {images.length > 0 &&
//                     images
//                         .filter((i, index) => indexs.some((i) => i === index))
//                         ?.map((i, index) => {
//                             return <img key={index} src={i} alt="preview" className="w-[47%] h-[120px] object-cover" />;
//                         })}
//                 <span className="bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4">{`${images.length} ảnh`}</span>
//                 <span
//                     className="text-white absolute right-5 bottom-1"
//                     onMouseEnter={() => setIsHoverHeart(true)}
//                     onMouseLeave={() => setIsHoverHeart(false)}
//                 >
//                     {isHoverHeart ? <RiHeartFill size={26} color="red" /> : <RiHeartLine size={26} />}
//                 </span>
//             </Link>
//             <div className="w-3/5">
//                 <div className="flex justify-between gap-4 w-full">
//                     <div className="text-red-600 font-medium">
//                         {handleStar(+star).length > 0 &&
//                             handleStar(+star).map((star, number) => {
//                                 return <span key={number}>{star}</span>;
//                             })}
//                         {title}
//                     </div>
//                     <div className="w-[10%] flex justify-end">
//                         <BsBookmarkStarFill size={24} color="orange" />
//                     </div>
//                 </div>
//                 <div className="my-2 flex items-center justify-between gap-2">
//                     <span className="font-bold flex-3 text-green-600  whitespace-nowrap overflow-hidden text-ellipsis">
//                         {attributes?.price}
//                     </span>
//                     <span className="flex-1">{attributes?.acreage}</span>
//                     <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis">
//                         {`${address.split(',')[address.split(',').length - 2]}${
//                             address.split(',')[address.split(',').length - 1]
//                         }`}
//                     </span>
//                 </div>
//                 <p className="text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden">{description}</p>
//                 <div className="flex items-center my-5 justify-between">
//                     <div className=" flex items-center">
//                         <img
//                             src="https://lnsel.com/wp-content/uploads/2018/12/anon-avatar-300x300.png"
//                             alt="avatar"
//                             className="w-[30px] h-[30px] object-cover rounded-full"
//                         />
//                         <p>{user?.name}</p>
//                     </div>
//                     <div className="flex items-center gap-1">
//                         <button type="button" className="bg-blue-700 text-white p-1 rounded-md">
//                             {`Gọi ${user?.phone}`}
//                         </button>
//                         <button type="button" className="text-blue-700 px-1 rounded-md border border-blue-700">
//                             Nhắn zalo
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default memo(Item);
