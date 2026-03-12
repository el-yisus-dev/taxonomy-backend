import { z } from "zod"

export const idParamSchema = z.object({
  id: z.string().regex(/^[1-9]\d*$/, "Id must be valid").transform(Number)
})
