require("dotenv").config();

const generateCode = (value) => {
    let output = "";
    //normalize dùng để chuẩn hóa chuỗi ký tự, ký tự gốc và ký tự gốc
    //replace dùng để loại bỏ ký tự dấu trong chuỗi
    value = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("");
    let merge = value + process.env.SECRET_GENERATE;
    let length = merge.length;
    for (let i = 0; i < 3; i++) {
        let index =
            i === 2
                ? Math.floor(merge.length / 2 + length / 2)
                : Math.floor(length / 2);
        output += merge.charAt(index);
        length = index;
    }
    return `${value.charAt(2)}${output}`.toUpperCase();
};

export default generateCode;
