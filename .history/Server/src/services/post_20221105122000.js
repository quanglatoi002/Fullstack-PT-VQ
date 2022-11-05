import db from "../models";

const getPosstService = () => new Promise(async(resolve, reject)) => {
    try {
        const response = await db.Post.findAll({
            raw: true

        })
        resolve(response)

    }catch(error) {
        reject(error)
    }
}