//trước tiên phải tách chuỗi thành 1 mảng với split sau đó sẽ map qua từng tk để lấy ra số từ trong chuỗi đó sau đó filter lấy ra những kết quả c
export const getNumbersPrice = (string) =>
    string
        .split(' ')
        .map((item) => +item)
        .filter((item) => !item === false);
export const getNumbersArea = (string) =>
    string
        .split(' ')
        .map((item) => +item.match(/\d+/))
        .filter((item) => item !== 0);
