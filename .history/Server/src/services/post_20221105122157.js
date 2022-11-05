import db from "../models";

const getPosstService = () => new Promise(async(resolve, reject)) => {
    try {
        const response = await db.Post.findAll({
            raw: true

        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? "OK" : "Got posts fail"
        })

    }catch(error) {
        reject(error)
    }
}