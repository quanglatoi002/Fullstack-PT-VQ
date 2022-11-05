import * as postService from "../services/post";

// controller called in file routers
export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService();
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Failed at post controller: " + error,
        });
    }
};
