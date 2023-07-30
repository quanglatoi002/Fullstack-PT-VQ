import { getNumbersPrice, getNumbersArea } from './getNumbers';
export const getCodePrice = (total) => {
    let arr = [];
    return total.map((item) => {
        let arrMaxMin = getNumbersPrice(item.value);
        if (arrMaxMin.length === 1) arr.push(arrMaxMin[0]);
        let sortedArray = arr.sort();
        return {
            ...item,
            min: sortedArray.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
            max:
                sortedArray.indexOf(arrMaxMin[0]) === 0
                    ? arrMaxMin[0]
                    : sortedArray.indexOf(arrMaxMin[0]) === 1
                    ? 999999999
                    : arrMaxMin[1],
        };
    });
};
