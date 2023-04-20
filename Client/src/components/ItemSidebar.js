import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//
import icons from '../utils/icons';
import { formatVietnameseToString } from '~/utils/Common/formatVietnameseToString';
import * as actions from '../store/actions';

const { GrNext } = icons;

const ItemSidebar = ({ title, content, isDouble, type }) => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [paramsSeach] = useSearchParams();
    // let entries = paramsSeach.entries();

    const dispatch = useDispatch();

    const formatContent = () => {
        // chia chỉ số index ra chẵn và lẻ oddEl là lẽ và ngược lại
        const oddEl = content?.filter((item, index) => index % 2 !== 0);
        const evenEl = content?.filter((item, index) => index % 2 === 0);
        // cho oddEl và evenEl đứng song song nhau
        const formatContent = oddEl.map((item, index) => {
            //[evenEl([0,1,2,3]), oddEl([0,1,2,3])]
            return {
                right: item,
                left: evenEl.find((item2, index2) => index2 === index),
            };
        });
        return formatContent;
    };

    const handleFilterPosts = (code) => {
        // dispatch(actions.getPostsLimit({ [type]: code }));

        navigate({
            pathname: location?.pathname,
            search: createSearchParams({ [type]: code }).toString(),
        });
    };

    return (
        <div className="p-4 w-full rounded-md bg-white">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            {!isDouble && (
                <div className="flex flex-col gap-2">
                    {content?.length > 0 &&
                        content.map((item) => (
                            <Link
                                to={`${formatVietnameseToString(item?.value)}`}
                                key={item?.code}
                                className="flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 border-dashed pb-1"
                            >
                                <GrNext size={10} />
                                <p>{item.value}</p>
                            </Link>
                        ))}
                </div>
            )}
            {isDouble && (
                <div className="flex flex-col gap-2">
                    {content?.length > 0 &&
                        formatContent(content).map((item, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-around">
                                    <div
                                        onClick={() => handleFilterPosts(item.left.code)}
                                        className="flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 border-dashed pb-1"
                                    >
                                        <GrNext size={10} color="#ccc" />
                                        <p>{item.left.value}</p>
                                    </div>
                                    <div
                                        onClick={() => handleFilterPosts(item.right.code)}
                                        className="flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 border-dashed pb-1"
                                    >
                                        <GrNext size={10} color="#ccc" />
                                        <p>{item.right.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default memo(ItemSidebar);
