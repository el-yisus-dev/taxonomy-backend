import { prisma } from "../lib/prisma.js"

export const taxonRepository = {
  findById(id: number) {
    return prisma.Taxon.findUnique({
      where: { id }
    })
  },

  create(data: any) {
    return prisma.taxon.create({
      data
    })
  }
}