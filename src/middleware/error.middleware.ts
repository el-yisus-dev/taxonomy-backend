import type { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError.js"
import { config } from "../config/config.js"

export const errorMiddleware = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      errors: err.errors ?? undefined
    })
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "error",
      message: "Token expired"
    })
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "error",
      message: "Invalid token"
    })
  }

  if (config.NODE_ENV === "development") {
    console.log(err);
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
}