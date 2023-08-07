import jwt from "jsonwebtoken";
require("dotenv").config();

const verifyToken = (req, res, next) => {
    let accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken)
        return res.status(401).json({
            err: 1,
            msg: "Missing access token",
        });
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err)
            return res.status(401).json({
                err: 1,
                msg: "Access token expired",
            });

        req.user = user;
        // next() được dùng để chuyển quyền điều khiển từ 1 middleware sang middleware tiếp theo.
        next();
    });
};

export default verifyToken;
