import { useEffect, useState } from 'react';
import { PageNumber } from '../../components';
import { useSelector } from 'react-redux';
import icons from '../../utils/icons';
import { useSearchParams } from 'react-router-dom';

const { GrLinkNext } = icons;

const Pagination = () => {
    const { count, posts } = useSelector((state) => state.post);
    const [arrPage, setArrPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isHideEnd, setIsHideEnd] = useState(false);
    const [isHideStart, setIsHideStart] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // lấy ra giá trị của page vd page lúc này là 2
        let page = searchParams.get('page');
        // nếu có page và page (giá trị trên URL) phải khác với giá trị của page hiện tại thì setCurrentPage(page)
        page && +page !== currentPage && setCurrentPage(+page);
        // nếu không có page thì gán mặc định cho setCurrentPage(1)m
        !page && setCurrentPage(1);
    }, [currentPage, searchParams]);

    useEffect(() => {
        // vd count = 6 thì lúc này tương đương với trang đầu tiên là 6/5 = 1,2 được làm tròn lên 2
        let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS);
        //lúc này có 2 trang và mặc định currentPage = 1 và cộng với 2 => 3 > 2(maxPage) thì phải trả về số maxPage còn ngược lại sẽ lấy trang hiện tại và + 2
        let end = currentPage + 2 > maxPage ? maxPage : currentPage + 2;
        // vd có 3 trang và đang đứng ở trang số 3 - 2 <= 1 thì lúc này sẽ cho nó chạy từ vị trí số 1 ngược lại mà só trang hiện tại - 2 mà lớn hơn 1 thì số trang hiện tại sẽ trừ đi 2
        let start = currentPage - 2 <= 1 ? 1 : currentPage - 2;
        let temp = [];
        for (let i = start; i <= end; i++) temp.push(i);
        //[0,1,2]
        setArrPage(temp);
        // currentPage = 3 và maxPage = 3(5-2) và xác định được điểm cuối để hiện dấu 3 chấm
        currentPage >= maxPage - 2 ? setIsHideEnd(true) : setIsHideEnd(false);
        currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false);
        // 3 => 1 2 3 (1 ... 2 3)
    }, [count, posts, currentPage]);
    return (
        <div className="flex items-center justify-center gap-2 py-5">
            {!isHideStart && <PageNumber setCurrentPage={setCurrentPage} text={1} />}
            {!isHideStart && currentPage !== 4 && <PageNumber text={'...'} />}
            {arrPage.length > 0 &&
                arrPage.map((item) => {
                    return (
                        <PageNumber key={item} text={item} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    );
                })}
            {!isHideEnd && <PageNumber text={'...'} />}
            {!isHideEnd && (
                <PageNumber
                    icon={<GrLinkNext />}
                    setCurrentPage={setCurrentPage}
                    text={Math.floor(count / posts.length)}
                />
            )}
        </div>
    );
};

export default Pagination;
