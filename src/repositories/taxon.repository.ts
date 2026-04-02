import { prisma } from "../lib/prisma.js"
import type { CreateTaxonDTO, TaxonRank } from "../types/Taxon.js"
import { ApiError } from "../utils/ApiError.js"


export const createTaxon = async (data: {
  name: string,
  rank: TaxonRank,
  parentId?: number | null
  description?: string | null,
  createdBy: number,
}) => {
    
    return prisma.taxon.create({
      data
    })

}

export const findById = async (id: number) => {
  return prisma.taxon.findFirst({
    where: {
      id,
      deletedAt: null
    }
  })
}
