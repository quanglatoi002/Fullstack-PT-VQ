import { memo } from 'react';
import icons from '../utils/icons';

const { GrNext } = icons;

const ItemSidebar = ({ title, content, isDouble }) => {
    return (
        <div className="p-4 w-full rounded-md bg-white">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            {!isDouble && (
                <div className="flex flex-col gap-2">
                    {content?.length > 0 &&
                        content.map((item) => (
                            <div
                                key={item?.code}
                                className="flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 border-dashed pb-1"
                            >
                                <GrNext size={10} />
                                <p>{item.value}</p>
                            </div>
                        ))}
                </div>
            )}
            {isDouble && (
                <div className="flex flex-col gap-2">
                    {content?.length > 0 &&
                        content.map((item) => (
                            <div
                                key={item?.code}
                                className="flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 border-dashed pb-1"
                            >
                                <GrNext size={10} />
                                <p>{item.value}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default memo(ItemSidebar);
