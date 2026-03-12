import bcrypt from "bcrypt";

import * as userRepository from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { getTotalPages } from "../utils/Pagination.js";
import type { CreateUserDTO } from "../types/User.js";


export const createUser = async (data: CreateUserDTO) => {
  
  const existingEmail = await userRepository.findUserByEmail(data.email)

  if (existingEmail) {
    throw new ApiError(409, "Email already registered")
  }

  const existingUsername = await userRepository.findUserByUsername(data.username)

  if (existingUsername) {
    throw new ApiError(409, "Username already taken")
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await userRepository.createUser({
    ...data,
    password: hashedPassword
  })
  
  const { password , ...safeUser } = user;

  return safeUser
}

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
  const safeUsers = users.map( user => {
      const { password, ...safeUser } = user
      return safeUser
  })

  return {
    items: safeUsers,
    meta: {
      page,
      limit,
      total,
      totalPages
    }
  }
}

export const getUserById = async (id: number) => {
  const user = await userRepository.findUserById(id)

  if (!user) {
    throw new ApiError(404, "Username not found")  
  }
  const { password, ...safeUser } = user;
  
  return safeUser
}

export const deleteUser = async (id: number) => {
  return userRepository.softDeleteUser(id)
}