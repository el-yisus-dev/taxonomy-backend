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

export const findUserByIdentifier = async (identifier: string) => {
  const where = identifier.includes("@") 
    ? { email: identifier } 
    : { username: identifier };

  return prisma.user.findUnique({
    where,
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      lastName: true,
      cellphone: true,
      avatarUrl: true,
      role: true,
    },
  });
};

export const findUserWithPassword = async (identifier: string) => {
  const where = identifier.includes("@") 
    ? { email: identifier } 
    : { username: identifier };

  const user = await prisma.user.findUnique({
    where,
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      lastName: true,
      cellphone: true,
      avatarUrl: true,
      role: true,
      password: true,
    },
  });

  return user;
};

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      lastName: true,
      cellphone: true,
      avatarUrl: true,
      role: true,
    }
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
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      lastName: true,
      cellphone: true,
      avatarUrl: true,
      role: true,
      createdAt: true,
      lastLoginAt: true
    }
  })
};

export const countUsers = async () => {
  return prisma.user.count();
};

export const updateUser = async (id: number, data: Partial<{ name: string; lastName: string; cellphone: string }>) => {
  return prisma.user.update({
    where: { 
      id,
      isActive: true
    },
    data,
  });
};

export const updateLastLoginDate = async (id: number) => {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      lastLoginAt: new Date()
    }
  })
}

export const softDeleteUser = async (id: number) => {
  return prisma.user.update({
    where: { 
      id,
      deletedAt: null 
    },
    data: {
      deletedAt: new Date(),
      isActive: false
    }
  })
};