import { memo } from 'react';

const Login = ({ label, placeholder, value, setValue, keyPayload, invalidFields, setInvalidFields, type }) => {
    return (
        <div className="w-full">
            <label className="mb-[5px] block font-normal text-xs" htmlFor="Phone">
                {label}
            </label>
            <input
                type={type || 'text'}
                id="phone"
                placeholder={placeholder}
                className="w-full h-[45px] px-3 leading-[1.15] rounded-md text-[21px] outline-none bg-[#e8f0fe] font-bold"
                value={value}
                onChange={(e) => {
                    setValue((prev) => ({ ...prev, [keyPayload]: e.target.value }));
                }}
                onFocus={() => setInvalidFields([])}
            />
            {invalidFields.length > 0 && invalidFields.some((i) => i.name === keyPayload) && (
                <small className="text-red-500 italic">
                    {invalidFields.find((i) => i.name === keyPayload)?.message}
                </small>
            )}
        </div>
    );
};

export default memo(Login);
