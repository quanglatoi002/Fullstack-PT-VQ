import { memo } from 'react';
import icons from '../utils/icons';

const { GrNext } = icons;

const ItemSidebar = ({ title, content, double }) => {
    return (
        <div className="p-4 w-full rounded-md bg-white">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
        </div>
    );
};

export default memo(ItemSidebar);
