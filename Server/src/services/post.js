import db from "../models";

export const getPostsService = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Post.findAll({
                raw: true,
                nest: true,
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: [
                            "price",
                            "acreage",
                            "published",
                            "hashtag",
                        ],
                    },
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["name", "zalo", "phone"],
                    },
                ],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Failed to get posts",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });

export const getPostsLimitService = (page, query) =>
    new Promise(async (resolve, reject) => {
        try {
            let offset = !page || +page <= 1 ? 0 : +page - 1;
            console.log(offset);
            console.log(query);
            const response = await db.Post.findAndCountAll({
                where: query,
                raw: true,
                nest: true,
                offset: offset * +process.env.LIMIT || 0,
                limit: +process.env.LIMIT, // limit = 5
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: [
                            "price",
                            "acreage",
                            "published",
                            "hashtag",
                        ],
                    },
                    {
                        model: db.User,
                        as: "user",
                        attributes: ["name", "zalo", "phone"],
                    },
                ],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Failed to get posts",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });
export const getNewPostService = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Post.findAll({
                raw: true,
                nest: true,
                offset: 0,
                // lọc trực tiếp trong db
                //lưu ý khi sử dụng order --- order chỉ sử dụng được khi bạn sử dụng các phương thức sau findOne,findAll
                order: [["createdAt", "DESC"]],
                limit: +process.env.LIMIT,
                // include được dùng để liên kết các mô hình với nhau. Khi bạn thực hiện một truy vấn để lấy dữ liệu từ nhiều bảng thì có thể sử dụng include. Vd trong đó User và Post có quan hệ khóa chính khóa ngoại.
                include: [
                    { model: db.Image, as: "images", attributes: ["image"] },
                    {
                        model: db.Attribute,
                        as: "attributes",
                        attributes: [
                            "price",
                            "acreage",
                            "published",
                            "hashtag",
                        ],
                    },
                ],
                attributes: ["id", "title", "star", "createdAt"],
            });
            resolve({
                err: response ? 0 : 1,
                msg: response ? "OK" : "Getting posts is failed.",
                response,
            });
        } catch (error) {
            reject(error);
        }
    });
