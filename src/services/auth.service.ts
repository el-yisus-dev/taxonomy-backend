import bcrypt from "bcrypt";

import * as userRepository from "../repositories/user.repository.js";
import type { LoginData } from "../types/User.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessToken } from "../utils/Jwt.js";


export const validateUserCredentials = async (data: LoginData) => {
  const { identifier, password } = data;

  const user = await userRepository.findUserWithPassword(identifier);

  if (user === null || user === undefined) {
    throw new ApiError(401, "User not found.");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ApiError(401, "Bad password brooo....");
  }

  const payload = {
    sub: user.id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  
  await userRepository.updateLastLoginDate(user.id);

  const safeUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    lastName: user.lastName,
    role: user.role,
    avatarUrl: user.avatarUrl,
    cellphone: user.cellphone,
  };

  return { user: safeUser, accessToken };
};