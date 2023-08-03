require("dotenv").config();

//giá trị nhận vào 'Từ 15-20 triệu'
const generateCode = (value) => {
    let output = "";
    //normalize dùng để chuẩn hóa chuỗi ký tự, ký tự gốc và ký tự gốc
    //replace dùng để loại bỏ ký tự dấu trong chuỗi
    //console.log('Từ 10 - 15 triệu')
    value = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("");
    //value lúc này sẽ là Tu15-20trieu
    let merge = value + process.env.SECRET_GENERATE;
    //kết quả từ merge Tu15-20trieuphongtro-VQ
    console.log(merge);
    let length = merge.length;
    //đếm độ dài dài của merge
    // vd: length = 22
    //bd i = 0 thì index = 11,
    for (let i = 0; i < 3; i++) {
        let index =
            i === 2
                ? // 11 + 2
                  Math.floor(merge.length / 2 + length / 2)
                : Math.floor(length / 2);
        output += merge.charAt(index);
        //kết quả sau cùng của output = u1o
        console.log(output);
        //Truy xuất ra giá trị từ index truyền vào mới được xử lý sẽ là merge.chartAt(11)=>out = e. Ở đâu lưu ý là chỉnh nhận giá trị là number thôi
        length = index;
        // cập nhật lại độ dài của length = 11
    }
    return `${value.charAt(2)}${output}`.toUpperCase();
    //1u1o
};

export default generateCode;
