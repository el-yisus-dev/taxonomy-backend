import { prisma } from "../lib/prisma.js"

export const createUser = async (data: {
  email: string
  password: string
  role?: "USER" | "MODERATOR"
  cellphone?: string
}) => {
  return prisma.user.create({
    data
  })
}

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  })
}

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id }
  })
}

export const findAllUsers = async () => {
  return prisma.user.findMany({
    where: {
      deletedAt: null
    }
  })
}

export const softDeleteUser = async (id: number) => {
  return prisma.user.update({
    where: { id },
    data: {
      deletedAt: new Date()
    }
  })
}