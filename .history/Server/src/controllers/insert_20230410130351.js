import * as inserService from "../services/insert";

export const insert = async (req, res) => {
    try {
        const response = await inserService.insertService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Fail att auth controller: " + error,
        });
    }
};
