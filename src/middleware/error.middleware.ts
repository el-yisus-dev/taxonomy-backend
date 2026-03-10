import type { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError.js"

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      errors: err.errors ?? err.message
    })
  }

  console.error(err)

  return res.status(500).json({
    status: "error",
    errors: "Internal server error"
  })
}