import { useEffect } from 'react';
import { Button, Item } from '~/components';
import { getPosts, getPostsLimit } from '~/store/actions/post';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const List = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    console.log(searchParams);
    const { posts } = useSelector((state) => state.post);

    useEffect(() => {
        //tạo ra 1 mảng rỗng
        let params = [];
        // lặp qua các cặp key-value của tham số truy vấn
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        // sau đó dùng map để chuyển từ 1 mảng thành 1 obj
        let searchParamsObject = {};
        params?.map((i) => {
            searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] };
        });
        // params?.forEach((i) => {
        //     if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        //         searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
        //     } else {
        //         searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
        //     }
        // });
        dispatch(getPostsLimit(searchParamsObject));
    }, [dispatch, searchParams]);

    //     if (categoryCode) searchParamsObject.categoryCode = categoryCode;
    //     dispatch(getPostsLimit(searchParamsObject));
    // }, [searchParams, categoryCode]);
    return (
        <div className="w-full p-2 bg-white shadow-sm rounded-md px-6">
            <div className="flex items-center justify-between my-3">
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
