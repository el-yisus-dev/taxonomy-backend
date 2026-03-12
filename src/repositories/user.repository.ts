import { prisma } from "../lib/prisma.js"
import type { updateUserDTO } from "../types/User.js";

export const createUser = async (data: {
  email: string
  username: string
  name: string
  lastName: string
  password: string
  cellphone?: string
}) => {

  return prisma.user.create({
    data
  })
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  })
};

export const findUserByUsername = async (username: string) => {
  return prisma.user.findUnique({
    where: { username }
  })
};

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id }
  })
};

export const findAllUsers = async ({
  skip,
  limit
}: {
  skip: number
  limit: number
}) => {

  return prisma.user.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc"
    }
  })
};

export const countUsers = async () => {
  return prisma.user.count();
};

export const updateUser = async (id: number, data: Partial<{ name: string; lastName: string; cellphone: string }>) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const softDeleteUser = async (id: number) => {
  return prisma.user.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      isActive: false
    }
  })
};