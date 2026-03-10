import bcrypt from "bcrypt";

import * as userRepository from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const createUser = async (data: {
  email: string
  password: string
  cellphone?: string
}) => {

  const existingUser = await userRepository.findUserByEmail(data.email)

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  return userRepository.createUser({
    ...data,
    password: hashedPassword
  })
}

export const getUsers = async () => {
  return userRepository.findAllUsers()
}

export const getUserById = async (id: number) => {
  const user = await userRepository.findUserById(id)

  if (!user) {
    throw new Error("User not found")
  }

  return user
}

export const deleteUser = async (id: number) => {
  return userRepository.softDeleteUser(id)
}