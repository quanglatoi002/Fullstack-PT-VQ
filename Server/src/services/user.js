import db from "../models";

// lấy thông tin người dùng ngoại trừ password
export const getOne = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { id },
                raw: true,
                // exclude loại trừ password
                attributes: {
                    exclude: ["password"],
                },
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Failed to get provinces.",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });
