import db from "../models";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
require("dotenv").config();

import chothuecanho from "../../data/chothuecanho.json";
import chothuematbang from "../../data/chothuematbang.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import nhachothue from "../../data/nhachothue.json";
import generateCode from "../utils/generateCode";
import { getNumberFromString } from "../utils/common";
import { dataPrice, dataArea } from "../utils/data";

const dataBody = nhachothue.body;
// const prices =
//bcrypt is encode with 12 characters
const hashPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = () =>
    new Promise(async (resolve, reject) => {
        try {
            const labelCodes = [];
            dataBody.forEach(async (item) => {
                let postId = v4();
                let labelCode = generateCode(
                    item?.header?.categories?.categoryType
                ).trim();
                labelCodes?.every((item) => item?.code !== labelCode) &&
                    labelCodes.push({
                        code: labelCode,
                        value: item?.header?.categories?.categoryType?.trim(),
                    });
                let attributesId = v4();
                let userId = v4();
                let imagesId = v4();
                let overviewId = v4();
                let currentArea = getNumberFromString(
                    item?.header?.attributes?.acreage
                );
                let currentPrice = getNumberFromString(
                    item?.header?.attributes?.price
                );
                await db.Post.create({
                    id: postId,
                    title: item?.header?.title,
                    star: item?.header?.star,
                    labelCode,
                    address: item?.header?.address,
                    attributesId,
                    categoryCode: "NCT",
                    description: JSON.stringify(item?.mainContent?.content),
                    userId,
                    overviewId,
                    imagesId,
                    areaCode: dataArea.find(
                        (area) =>
                            area.max >= currentArea && area.min <= currentArea
                    )?.code,
                    priceCode: dataPrice.find(
                        (price) =>
                            price.max >= currentPrice &&
                            price.min <= currentPrice
                    )?.code,
                });
                await db.Attribute.create({
                    id: attributesId,
                    price: item?.header?.attributes?.price,
                    acreage: item?.header?.attributes?.acreage,
                    published: item?.header?.attributes?.published,
                    hashtag: item?.header?.attributes?.hashtag,
                });
                await db.Image.create({
                    id: imagesId,
                    image: JSON.stringify(item?.images),
                });
                await db.Overview.create({
                    id: overviewId,
                    code: item?.overview?.content.find(
                        (i) => i.name === "Mã tin:"
                    )?.content,
                    area: item?.overview?.content.find(
                        (i) => i.name === "Khu vực"
                    )?.content,
                    type: item?.overview?.content.find(
                        (i) => i.name === "Loại tin rao:"
                    )?.content,
                    target: item?.overview?.content.find(
                        (i) => i.name === "Đối tượng thuê:"
                    )?.content,
                    bonus: item?.overview?.content.find(
                        (i) => i.name === "Gói tin:"
                    )?.content,
                    created: item?.overview?.content.find(
                        (i) => i.name === "Ngày đăng:"
                    )?.content,
                    expired: item?.overview?.content.find(
                        (i) => i.name === "Ngày hết hạn:"
                    )?.content,
                });
                await db.User.create({
                    id: userId,
                    name: item?.contact?.content.find(
                        (i) => i.name === "Liên hệ:"
                    )?.content,
                    password: hashPassword("123456"),
                    phone: item?.contact?.content.find(
                        (i) => i.name === "Điện thoại:"
                    )?.content,
                    zalo: item?.contact?.content.find((i) => i.name === "Zalo")
                        ?.content,
                });
            });
            labelCodes?.forEach(async (item) => {
                await db.Label.create(item);
            });

            resolve("Done");
        } catch (error) {
            reject(error);
        }
    });
const createPrices = () =>
    new Promise(async (resolve, reject) => {
        try {
            await db.User.create({
                id: userId,
                name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
                    ?.content,
                password: hashPassword("123456"),
                phone: item?.contact?.content.find(
                    (i) => i.name === "Điện thoại:"
                )?.content,
                zalo: item?.contact?.content.find((i) => i.name === "Zalo")
                    ?.content,
            });
        } catch (error) {
            reject(error);
        }
    });
