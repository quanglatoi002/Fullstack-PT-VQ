// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // ======= !library =====
// import { Button, Item } from '~/components';
// import { getPosts, getPostsLimit } from '~/store/actions/post';
// import { Pagination } from './index';

// const List = () => {
//     const dispatch = useDispatch();
//     // state.post called reducers/rootReducer/post <=> postReducer
//     const { posts, count } = useSelector((state) => state.post);

//     useEffect(() => {
//         dispatch(getPostsLimit(0));
//     }, []);

//     return (
//         <div className="w-full p-2 bg-white shadow-sm rounded-md px-6">
//             <div>
//                 <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
//                 <span>Cập nhật: 12:05 25/08/2022</span>
//             </div>
//             <div className="flex items-center gap-2 my-2">
//                 <span>Sắp xếp:</span>
//                 <Button bgColor="bg-gray-200" text="Mặc định" />
//                 <Button bgColor="bg-gray-200" text="Mới nhất" />
//             </div>
//             <div className="items">
//                 {posts?.length > 0 &&
//                     posts.map((item) => {
//                         return (
//                             <Item
//                                 key={item.id}
//                                 address={item?.address}
//                                 attributes={item?.attributes}
//                                 description={JSON.parse(item?.description)}
//                                 images={JSON.parse(item.images.image)}
//                                 star={+item?.star}
//                                 title={item?.title}
//                                 user={item?.user}
//                             />
//                         );
//                     })}
//             </div>
//             <Pagination />
//         </div>
//     );
// };

// export default List;

import { useEffect } from 'react';
import { Button, Item } from '~/components';
import { getPosts, getPostsLimit } from '~/store/actions/post';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const List = ({ categoryCode }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { posts } = useSelector((state) => state.post);

    useEffect(() => {
        let params = [];
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {};
        params?.forEach((i) => {
            if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
            }
        });
        if (categoryCode) searchParamsObject.categoryCode = categoryCode;
        dispatch(getPostsLimit(searchParamsObject));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, categoryCode]);
    return (
        <div className="w-full p-2 bg-white shadow-sm rounded-md px-6">
            <div>
                <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
                <span>Cập nhật: 8:05 20/11/2022</span>
            </div>
            <div className="flex items-center gap-2 my-2">
                <span>Sắp xếp:</span>
                <Button bgColor="bg-gray-200" text="Mặc định" />
                <Button bgColor="bg-gray-200" text="Mới nhất" />
            </div>
            <div className="items">
                {posts?.length > 0 &&
                    posts.map((item) => {
                        return (
                            <Item
                                key={item?.id}
                                address={item?.address}
                                attributes={item?.attributes}
                                description={JSON.parse(item?.description)}
                                images={JSON.parse(item?.images?.image)}
                                star={+item?.star}
                                title={item?.title}
                                user={item?.user}
                                id={item?.id}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default List;
