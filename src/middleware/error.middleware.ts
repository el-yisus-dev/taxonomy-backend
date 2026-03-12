import type { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError.js"

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

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
}