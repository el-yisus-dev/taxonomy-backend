import type { Pagination, QueryParam } from "../types/Query.js"


const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10
const MAX_LIMIT = 100

const parsePage = (page: QueryParam): number => {
  const parsed = Number(page)

  if (!parsed || parsed < 1) {
    return DEFAULT_PAGE
  }

  return parsed
}

const parseLimit = (limit: QueryParam): number => {
  const parsed = Number(limit)

  if (!parsed || parsed < 1) {
    return DEFAULT_LIMIT
  }

  if (parsed > MAX_LIMIT) {
    return MAX_LIMIT
  }

  return parsed
}

export const getPagination = (query: {
  page?: string
  limit?: string
}): Pagination => {

  const page = parsePage(query.page)
  const limit = parseLimit(query.limit)

  const skip = (page - 1) * limit

  return { page, limit, skip }
}

export const getTotalPages = (
  total: number,
  limit: number
): number => {

  return Math.ceil(total / limit)
}