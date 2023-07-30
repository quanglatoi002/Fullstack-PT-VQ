import { getNumbersPrice, getNumbersArea } from './getNumbers';
export const getCodePrice = (total) => {
    let arrMaxMin = getNumbersPrice(item.value);
    return total.map((item) => ({
        ...item,
        min: arrMaxMin[0],
    }));
};
