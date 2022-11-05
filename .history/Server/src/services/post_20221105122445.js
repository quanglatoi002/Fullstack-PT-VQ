import db from "../models";

const getPostService = () => new Promise(async(resolve, reject)) => {
    try {
        const response = await db.Post.findAll({
            raw: true

        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? "OK" : "Failed to get posts"
        })

    }catch(error) {
        reject(error)
    }
}