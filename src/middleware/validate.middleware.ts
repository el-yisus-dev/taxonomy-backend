import type { ZodType } from "zod"
import type { Request, Response, NextFunction } from "express"

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse(req.body)

    if (!result.success) {
        const errors = result.error.issues.map(issue => ({
            field: issue.path.join("."),
            message: issue.message
        }))

        return res.status(400).json({
            status: "error",
            errors
        })
        }

    req.body = result.data;
    next();
  }
};