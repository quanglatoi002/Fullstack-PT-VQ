import express from "express";
require("dotenv").config(); // LAY BIEN TRONG ENV
import cors from "cors"; // BIEN MOI TRUONG

import initRouters from "./src/routers";
import connectDB from "./src/config/connectDB";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["POST", "GET", "PUT", "DELETE"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //cho phép được data các form từ client lên

initRouters(app);
connectDB();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
    console.log(`Server is running on the port ${listener.address().port}`);
});
