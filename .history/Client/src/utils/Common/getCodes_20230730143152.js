import { getNumbersPrice, getNumbersArea } from './getNumbers';
export const getCodePrice = (total) => {
    let arrMaxMin = getNumbersPrice(item.value)[0];
    return total.map((item) => ({
        ...item,
        arr: getNumbersPrice(item.value),
        min: getNumbersPrice(item.value)[0],
    }));
};
