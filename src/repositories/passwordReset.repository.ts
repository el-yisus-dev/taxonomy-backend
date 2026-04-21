import { prisma } from "../lib/prisma.js";

export const createPasswordResetToken = async (data: {
  token: string;
  userId: number;
  expiresAt: Date;
}) => {
  return prisma.passwordResetToken.create({ data });
};

export const findValidResetToken = async (token: string) => {
  return prisma.passwordResetToken.findFirst({
    where: {
      token,
      expiresAt: {
        gte: new Date(),
      },
    },
  });
};

export const deleteUserResetTokens = async (userId: number) => {
  return prisma.passwordResetToken.deleteMany({
    where: { userId },
  });
};

export const deleteResetToken = async (id: number) => {
  return prisma.passwordResetToken.delete({
    where: { id },
  });
};

export const findLatestByUser = async (userId: number) => {
  return prisma.passwordResetToken.findFirst({
    where: {
      userId,
      expiresAt: {
        gte: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const incrementAttempts = async (id: number) => {
  return prisma.passwordResetToken.update({
    where: { id },
    data: {
      attempts: {
        increment: 1,
      },
    },
  });
};
