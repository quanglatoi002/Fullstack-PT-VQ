import { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '~/assets/logo1.png';
import { Button } from '~/components';
import icons from '~/utils/icons';
import { path } from '~/utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '~/store/actions';

const { AiOutlinePlusCircle } = icons;

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } });
    }, []);
    return (
        <div className="max-w-1100 w-full flex justify-between items-center">
            <Link to={'/'}>
                <img src={logo} alt="logo" className="w-[150px] h-[100px] object-cover" />
            </Link>
            <div className="flex items-center gap-1">
                {!isLoggedIn && (
                    <div className="flex items-center gap-1">
                        <span className="text-[16px] mr-[10px]">Phongtro-VQ xin chào!</span>
                        <Button
                            text={'Login'}
                            textColor="text-white"
                            bgColor="bg-secondary1"
                            onClick={() => {
                                goLogin(false);
                            }}
                        />
                        <Button
                            text={'Register'}
                            textColor="text-white"
                            bgColor="bg-secondary1"
                            onClick={() => {
                                goLogin(true);
                            }}
                        />
                    </div>
                )}
                {isLoggedIn && (
                    <div className="flex items-center gap-1">
                        <span className="text-[16px] mr-[10px]">Ten !</span>
                        <Button
                            text={'Logout'}
                            textColor="text-white"
                            bgColor="bg-secondary4"
                            onClick={() => dispatch(actions.logout())}
                        />
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
