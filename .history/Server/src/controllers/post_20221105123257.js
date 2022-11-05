import * as postService from "../services/post";

// controller called in file routers
const getPosts = (req, res) => {
    try {
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Failed at post controller: " + error,
        });
    }
};
