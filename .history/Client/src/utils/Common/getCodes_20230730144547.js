import { getNumbersPrice, getNumbersArea } from './getNumbers';
export const getCodePrice = (total) => {
    return total.map((item) => {
        let arrMaxMin = getNumbersPrice(item.value);
        let arr = [];
        if (arrMaxMin.length === 1) arr.push(arrMaxMin[0]);
        return {
            ...item,
            min: arrMaxMin.length === 1 ? min : arrMaxMin[0],
            max: arrMaxMin[1],
        };
    });
};
