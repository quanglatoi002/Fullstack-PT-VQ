//trước tiên phải tách chuỗi thành 1 mảng với split sau đó sẽ map qua từng tk để lấy ra số từ trong chuỗi đó sau đó filter lấy ra kết quả trả về true là đúng. vd !2 === false sẽ trả về true
export const getNumbersPrice = (string) =>
    string
        .split(' ')
        .map((item) => +item)
        .filter((item) => !item === false);
export const getNumbersArea = (string) =>
    string
        .split(' ')
        // '/' được sử dụng để bắt đầu và kết thúc biểu thức chính quy trong Js
        // '\d' mẫu ký tự cho 1 chữ số (0-9)
        // '+' đứng sau "\d" chỉ ra rằng 1 hoặc nhiu chữ số có thể xuất hiện liên tiếp.
        .map((item) => +item.match(/\d+/))
        .filter((item) => item !== 0);
