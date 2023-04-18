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
