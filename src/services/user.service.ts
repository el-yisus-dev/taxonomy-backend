import bcrypt from "bcrypt";

import * as userRepository from "../repositories/user.repository.js";
import * as emailVerificationRepository from "../repositories/emailVerification.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { getTotalPages } from "../utils/Pagination.js";
import { generateToken, hashToken } from "../utils/TokenEmail.js";
import { sendVerificationEmail } from "./email.service.js";
import type { CreateUserDTO, updateUserDTO } from "../types/User.js";


export const createUser = async (data: CreateUserDTO) => {
  
  const existingEmail = await userRepository.findUserByIdentifier(data.email)

  if (existingEmail) {
    throw new ApiError(409, "Email already registered")
  }

  const existingUsername = await userRepository.findUserByIdentifier(data.username)

  if (existingUsername) {
    throw new ApiError(409, "Username already taken")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await userRepository.createUser({
    ...data,
    password: hashedPassword
  })
  
  await emailVerificationRepository.deleteUserTokensRecords(user.id);

  const rawToken = generateToken();
  const hashedToken = hashToken(rawToken);

  const emailVerificationData = {
    token: hashedToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  }

  await emailVerificationRepository.createEmailVerificationRecord({...emailVerificationData})

  await sendVerificationEmail(user, rawToken);
  
  const { password , ...safeUser } = user;

  return safeUser
};

export const getUsers = async ({
  page,
  limit,
  skip
}: {
  page: number
  limit: number
  skip: number
}) => {

  const [users, total] = await Promise.all([
    userRepository.findAllUsers({ skip, limit }),
    userRepository.countUsers()
  ])

  const totalPages = getTotalPages(total, limit);

  return {
    items: users,
    meta: {
      page,
      limit,
      total,
      totalPages
    }
  }
};

export const getUserById = async (id: number) => {
  const user = await userRepository.findUserById(id)

  if (!user) {
    throw new ApiError(404, "User not found")  
  }  
  return user;
};

export const updateUser = async (id: number, data: updateUserDTO) => {
  const existingUser = await userRepository.findUserById(id);
  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  const updatedUser = await userRepository.updateUser(id, data);
  
  return updatedUser;

};

export const deleteUser = async (id: number) => {
  const existingUser = await userRepository.findUserById(id);
  
  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }

  return userRepository.softDeleteUser(id)
};