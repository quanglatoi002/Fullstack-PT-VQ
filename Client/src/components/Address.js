import React, { useEffect, useState } from 'react';
import { SelectAddress } from '../components';
import { apiGetPublicProvinces, apiGetPublicDistrict } from '~/services';

const Address = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces();
            if (response.status === 200) {
                setProvinces(response?.data?.results);
            }
        };
        fetchPublicProvince();
    }, []);
    useEffect(() => {
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province);
            if (response.status === 200) {
                setDistricts(response?.data?.results);
            }
        };
        setDistrict(null);
        province && fetchPublicDistrict();
        !province ? setReset(true) : setReset(false);
        !province && setDistricts([]);
    }, [province]);

    return (
        <div>
            <h2 className=" font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <SelectAddress
                        type="province"
                        value={province}
                        setValue={setProvince}
                        label="Tỉnh/Thành phố"
                        className="flex-1"
                        options={provinces}
                    />
                    <SelectAddress
                        reset={reset}
                        type="district"
                        value={district}
                        setValue={setDistrict}
                        label="Quận/Huyện"
                        className="flex-1"
                        options={districts}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium" htmlFor="exactly-address">
                        Địa chỉ chính xác
                    </label>
                    <input
                        id="exactly-address"
                        value={` ${
                            district ? districts?.find((item) => item.district_id === district)?.district_name : ''
                        } ${province ? provinces?.find((item) => item.province_id === province)?.province_name : ''}`}
                        type="text"
                        readOnly
                        className="border border-gray-200 rounded-md bg-gray-100 p-2 w-full outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default Address;
