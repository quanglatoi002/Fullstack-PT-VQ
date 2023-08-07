import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import logo from '~/assets/logo1.png';
import { Button } from '~/components';
import icons from '~/utils/icons';
import { path } from '~/utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '~/store/actions';
import menuManage from '~/utils/menuManage';
import { AiOutlineLogout } from 'react-icons/ai';

const { AiOutlinePlusCircle } = icons;

const Header = () => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const headerRef = useRef();
    const [searchParams] = useSearchParams();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { currentData } = useSelector((state) => state.user);

    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } });
    }, []);

    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get('page')]);

    return (
        <div ref={headerRef} className="max-w-1100 w-full flex justify-between items-center">
            <Link to={'/'}>
                <img src={logo} alt="logo" className="w-[150px] h-[100px] object-cover" />
            </Link>
            <div className="flex items-center gap-1">
                {!isLoggedIn && (
                    <div className="flex items-center gap-1">
                        <span className="text-[16px] mr-[10px]">Phongtro-VQ xin chào!</span>
                        <Button
                            text={'Đăng nhập'}
                            textColor="text-white"
                            bgColor="bg-secondary1"
                            onClick={() => {
                                goLogin(false);
                            }}
                        />
                        <Button
                            text={'Đăng ký'}
                            textColor="text-white"
                            bgColor="bg-secondary1"
                            onClick={() => {
                                goLogin(true);
                            }}
                        />
                    </div>
                )}
                {isLoggedIn && (
                    <div className="flex items-center gap-1 relative">
                        <span className="text-[16px] mr-[10px]">{currentData.name}</span>
                        <Button
                            onClick={() => setIsShowMenu((prev) => !prev)}
                            text={'Quản lý tài khoản'}
                            textColor="text-white"
                            bgColor="bg-blue-700"
                            px={'px-4'}
                        />
                        {isShowMenu && (
                            <div className="absolute border border-red-600 bg-white rounded-md shadow-md p-4 top-full right-0 min-w-[200px] flex flex-col">
                                {menuManage.map((item) => (
                                    <Link
                                        className="hover:text-orange-500 text-blue-600 border-b border-gray-500 py-2 flex items-center gap-2"
                                        key={item.id}
                                        to={item?.path}
                                    >
                                        {item?.icon}
                                        {item.text}
                                    </Link>
                                ))}
                                <span
                                    className="flex items-center gap-2 cursor-pointer hover:text-orange-500 text-blue-600"
                                    onClick={() => {
                                        setIsShowMenu(false);
                                        dispatch(actions.logout());
                                    }}
                                >
                                    <AiOutlineLogout />
                                    Đăng xuất
                                </span>
                            </div>
                        )}
                    </div>
                )}

                <Button
                    text={'New content'}
                    textColor="text-white"
                    bgColor="bg-secondary2"
                    IcAfter={AiOutlinePlusCircle}
                />
            </div>
        </div>
    );
};

export default Header;
