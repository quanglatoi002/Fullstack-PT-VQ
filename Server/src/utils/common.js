export const getNumberFromString = (string) => {
    let number = 0;
    if (string.search("đồng/tháng") !== -1) {
        number = +string.match(/\d+/)[0] / Math.pow(10, 3);
    } else if (string.search("triệu/tháng") !== -1) {
        number = +string.match(/\d+/)[0];
    } else if (string.search("m")) {
        number = +string.match(/\d+/)[0];
    }
    return number;
};
export const getNumberFromStringV2 = (string) => {
    let number = 0;
    if (string.search("đồng/tháng") !== -1) {
        number = +string.match(/\d+/)[0] / Math.pow(10, 3);
        ////lưu ý khi dùng string.match nó sẽ tự động làm tròn xuống vd như 1.4 sẽ làm tròn xuống 1 cho nên phải dùng split để tách ra lấy phần tử đầu tiên
    } else if (string.search("triệu/tháng") !== -1) {
        number = +string.split(" ")[0];
    } else if (string.search("m")) {
        number = +string.match(/\d+/)[0];
    }
    return +number;
};
