import { getNumbersPrice, getNumbersArea } from './getNumbers';
export const getCodePrice = (total) => {
    return total.map((item) => ({
        ...item,
        arr: getNumbersPrice(item.value),
        min: 
    }));
};
