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

export const getPostsLimitService = (offset) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Post.findAndCountAll({
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
