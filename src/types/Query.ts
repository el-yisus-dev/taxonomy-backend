export type QueryParam = string | undefined

export interface Pagination {
  page: number
  limit: number
  skip: number
}