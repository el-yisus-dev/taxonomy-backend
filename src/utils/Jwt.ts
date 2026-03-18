import jwt, { type JwtPayload } from "jsonwebtoken";

import { config } from "../config/config.js";

export const generateAccessToken = (payload: object) => {
    // @ts-ignore
    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN || "15m",
    });
};


export const validateToken = (token: string): JwtPayload => {
    // @ts-ignore
    return jwt.verify(token, config.JWT_SECRET) as JwtPayload
}