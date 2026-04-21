import { prisma } from "../lib/prisma.js"


export const deleteUserTokensRecords = async (id: number) => {
    return prisma.emailVerificationToken.deleteMany({
        where: {
            userId: id
        }
    })
}

export const createEmailVerificationRecord = async (data: {
    token: string,
    userId: number,
    expiresAt: Date,
}) => {
    return prisma.emailVerificationToken.create({
        data
    })
}

export const emailVerificationToken = async (token: string) => {
    return prisma.emailVerificationToken.findFirst({
        where: {
          token: token,
          expiresAt: {
            gte: new Date(),
          },
        },
      });
}

export const deleteVerificationToken = async (id: number) => {
    return prisma.emailVerificationToken.delete({
    where: { id: id },
  });
}