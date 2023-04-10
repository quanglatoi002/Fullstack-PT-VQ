import authRouter from "./auth";
import insertRouter from "./insert";
import categoryRouter from "./category";
import postRouter from "./post";
import priceRouter from "./price";

const initRouter = (app) => {
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/insert", insertRouter);
    app.use("/api/v1/category", categoryRouter);
    app.use("/api/v1/post", postRouter);
    app.use("/api/v1/price", postRouter);
    // khi mình chọc zo api.v1/category thì nó sẽ trỏ qua category.js và gọi cái hàm router.get
    return app.use("/", (req, res) => {
        res.send("server on...");
    });
};
export default initRouter;
