import { Route, Routes } from 'react-router-dom';
import { Home, Login, RentalApartment, RentalHouse, RentalRoom, RentalSpace, Homepage } from '~/containers/Public';
import { path } from '~/utils/constant';
function App() {
    return (
        <div className="">
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path="*" element={<Homepage />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<RentalApartment />} />
                    <Route path={path.CHO_THUE_MAT_BANG} element={<RentalSpace />} />
                    <Route path={path.NHA_CHO_THUE} element={<RentalHouse />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<RentalRoom />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
