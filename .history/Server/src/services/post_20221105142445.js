import db from "../models";

export const getPostsService = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.Post.findAll({
                raw: true,
                nest : true
                include: [{ model: db.Image, as: "images" }],
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
