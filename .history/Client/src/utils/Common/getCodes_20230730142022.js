import { getNumbersArea, getNumbersPrice } from './getNumbers';
export const getCodePrice = (total) => {
    return total.map((item) => ({
        ...item,
    }));
};
