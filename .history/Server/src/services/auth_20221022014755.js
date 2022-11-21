import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
require("dotenv").config();

//bcrypt is encode with 12 characters
const hashPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = ({ phone, password, name }) =>
    new Promise(async (resolve, reject) => {
        try {
            //findOrCreate return array
            //[row, create new] = findOrCreate() if not exist then create new return true
            const response = await db.User.findOrCreate({
                where: { phone }, // find in DB if there is a 'phone' exist or not, if already exist it will get that phone's data and return the first element(response[0])
                defaults: {
                    // value function defaults will override all value in where
                    phone,
                    name,
                    password: hashPassword(password),
                    id: v4(),
                },
            });
            // if response[1] return true when will sign
            const token =
                response[1] &&
                jwt.sign(
                    {
                        id: response[0].id,
                        phone: response[0].phone,
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: "29d" } //expiry in 2 days
                );
            resolve({
                err: token ? 0 : 2,
                msg: token
                    ? "Register is successfully !"
                    : "Phone number has been already use !",
                token: token || null,
            });
        } catch (error) {
            reject(error);
        }
    });

export const loginService = ({ phone, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { phone }, // find in DB if there is a 'phone' exist or not, if already exist it will get that phone's data and return the first element(response[0])
                raw: true,
            });
            const isCorrectPassword =
                response && bcrypt.compareSync(password, response.password);
            const token =
                isCorrectPassword &&
                jwt.sign(
                    {
                        id: response.id,
                        phone: response.phone,
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: "2d" } //expiry in 2 days
                );
            resolve({
                err: token ? 0 : 2,
                msg: token
                    ? "Login is successfully !"
                    : response
                    ? "Password is wrong !"
                    : "Phone number not found !",
                token: token || null,
            });
        } catch (error) {
            reject(error);
        }
    });
