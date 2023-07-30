import { getNumbersPrice, getNumbersArea } from './getNumbers';
export const getCodePrice = (total) => {
    return total.map((item) => {
        let arrMaxMin = getNumbersPrice(item.value);
        let arr = [];
        if (arrMaxMin.length === 1) arr.push(arrMaxMin[0]);
        let sortedArray = arr.sort();
        return {
            ...item,
            min: sortedArray.indexOf(arrMaxMin[0]) ? 0 : arrMaxMin[0],
            max: arrMaxMin[1],
        };
    });
};
