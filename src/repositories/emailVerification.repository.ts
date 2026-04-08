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