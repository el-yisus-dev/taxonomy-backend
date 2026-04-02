import { prisma } from "../lib/prisma.js"
import type { TaxonRank } from "../types/Taxon.js"


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

export const isExist = async (name: string, rank: TaxonRank) => {
  
  return  prisma.taxon.findFirst({
     where: {
       name,
       rank,
     }
   })
} 
