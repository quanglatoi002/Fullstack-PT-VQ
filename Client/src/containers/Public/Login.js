import { useState, useEffect } from 'react';
import { InputForm, Button } from '~/components';
import { useLocation, useNavigate } from 'react-router-dom';
import * as actions from '~/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'; //notify on screen

const Login = () => {
    const location = useLocation(); //take path on vd:
    // http://localhost:3000/
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, msg, update } = useSelector((state) => state.auth);

    const [isRegister, setIsRegister] = useState(location.state?.flag);
    const [invalidFields, setInvalidFields] = useState([]);
    const [payload, setPayload] = useState({
        phone: '',
        password: '',
        name: '',
    });
    // when onClick register then state : true but
    // useCallback call the function only once so setRegister do not re-render the flag
    useEffect(() => {
        setIsRegister(location.state?.flag);
    }, [location.state?.flag]);

    useEffect(() => {
        isLoggedIn && navigate('/');
    }, [isLoggedIn]);

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error');
    }, [msg, update]);

    const handleSubmit = async () => {
        let finalPayload = isRegister
            ? payload
            : {
                  phone: payload.phone,
                  password: payload.password,
              };
        // const response = await apiRegister(payload);
        // console.log(response);
        let invalids = validate(finalPayload);
        if (invalids === 0) {
            isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload));
        }
        console.log(invalids);
    };

    const validate = (payload) => {
        let invalids = 0;
        let fields = Object.entries(payload); // object convert string
        fields.forEach((item) => {
            if (item[1] === '') {
                setInvalidFields((prev) => [
                    ...prev,
                    {
                        name: item[0],
                        message: 'Bạn không được bỏ trống trường này.',
                    },
                ]);
                invalids++;
            }
        });
        fields.forEach((item) => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidFields((prev) => [
                            ...prev,
                            {
                                name: item[0],
                                message: 'Mật khẩu phải có tối thiểu 6 kí tự.',
                            },
                        ]);
                        invalids++;
                    }
                    break;
                case 'phone':
                    if (!+item[1]) {
                        setInvalidFields((prev) => [
                            ...prev,
                            {
                                name: item[0],
                                message: 'Số điện thoại không hợp lệ.',
                            },
                        ]);
                        invalids++;
                    }
                    break;

                default:
                    break;
            }
        });
        return invalids;
    };

    return (
        <div className="w-full flex justify-center">
            <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-lg border-borderLogin border-solid shadow-md mt-5">
                <h3 className="text-2xl font-semibold text-center mb-3">{isRegister ? 'Register account' : 'Login'}</h3>
                <div className="flex flex-col gap-5">
                    {isRegister && (
                        <InputForm
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            label="FULL NAME"
                            placeholder="Enter full name"
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload={'name'}
                        />
                    )}
                    <InputForm
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        label="PHONE"
                        placeholder="Enter phone number"
                        value={payload.phone}
                        setValue={setPayload}
                        keyPayload={'phone'}
                    />
                    <InputForm
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        label="PASSWORD"
                        placeholder="Enter password"
                        value={payload.password}
                        setValue={setPayload}
                        keyPayload={'password'}
                        type="password"
                    />
                    <Button
                        text={isRegister ? 'Register account' : 'Login'}
                        bgColor="bg-secondary1"
                        textColor="text-white"
                        fullWidth
                        onClick={handleSubmit}
                    />
                    <div className="flex justify-between">
                        {isRegister ? (
                            <span>
                                Do you have an account yet?
                                <span
                                    onClick={() => {
                                        setIsRegister(false);
                                        setPayload({
                                            phone: '',
                                            password: '',
                                            name: '',
                                        });
                                    }}
                                    className="text-blue-500 hover:underline cursor-pointer"
                                >
                                    Login now
                                </span>
                            </span>
                        ) : (
                            <>
                                <span className="text-secondary1 hover:text-secondary3 cursor-pointer">
                                    Forgot your password?
                                </span>
                                <span
                                    onClick={() => {
                                        setIsRegister(true);
                                        setPayload({
                                            phone: '',
                                            password: '',
                                            name: '',
                                        });
                                    }}
                                    className="text-secondary1 hover:text-secondary3 cursor-pointer"
                                >
                                    Create a new account
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
