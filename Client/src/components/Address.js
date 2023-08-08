import React, { useEffect, useState } from 'react';
import { SelectAddress } from '../components';
import { apiGetPublicProvinces, apiGetPublicDistrict } from '~/services';

const Address = () => {
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    console.log(district, province);

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
                setDistrict(response?.data?.results);
            }
        };
        province && fetchPublicDistrict(province);
    }, [province]);

    return (
        <div>
            <h2 className=" font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <SelectAddress
                        value={province}
                        setValue={setProvince}
                        label="Tỉnh/Thành phố"
                        className="flex-1"
                        options={provinces}
                    />
                    <SelectAddress value={district} setValue={setDistrict} label="Quận/Huyện" className="flex-1" />
                </div>
                <div>
                    <input
                        value={123}
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
