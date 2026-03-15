import jwt from "jsonwebtoken";

import { config } from "../config/config.js";

export const generateAccessToken = (payload: object) => {
    // @ts-ignore
    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN || "15m",
    });
};