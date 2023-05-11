//trước tiên phải tách chuỗi thành 1 mảng với split sau đó sẽ map qua từng tk để lấy ra số từ trong chuỗi đó sau đó filter lấy ra kết quả trả về true là đúng. vd !2 === false sẽ trả về true
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
