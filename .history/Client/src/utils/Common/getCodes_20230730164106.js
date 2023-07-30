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
//chúng ta có thể hiểu là nếu như arrMaxMin[0] = 15 và nó cũng là tk đầu tiên trong mảng sortedArray thì nó max sẽ là phần tử đó. Còn nếu như trước khi có phần tử đã được push vào sortedArray thì tk giá trị hiện tại sẽ nằm ở vị trí [1] nhưng ở tk MaxMin vẫn là vị trí số [0] và kiểm tra nếu như giá trị maxmin[0] có nằm bên trong sortedArray và vị trí === 1 thì cho nó dương vô cùng, ngược lại cho nó ở mảng giá trị MaxMin[1]
export const getCodeArea = (total) => {
    let arr = [];
    return total.map((item) => {
        let arrMaxMin = getNumbersArea(item.value);

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

export const getCodes = (arrMinMax, prices) => {
    const pricesWithMinMax = getCodePrice(prices)
    const gaps = pricesWithMinMax.filter((item) => item.min <= arrMinMax[0] && item.max >= arrMinMax[0] || )
};
