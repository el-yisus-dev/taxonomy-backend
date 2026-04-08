import bcrypt from "bcrypt";

import * as userRepository from "../repositories/user.repository.js";
import * as emailVerificationRepository from "../repositories/emailVerification.repository.js";

import type { LoginData } from "../types/User.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessToken } from "../utils/Jwt.js";
import { generateToken, hashToken } from "../utils/TokenEmail.js";
import { sendVerificationEmail } from "./email.service.js";


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


export const verifyEmail = async (token: string) => {
  const hashedToken = hashToken(token);

  const record = await emailVerificationRepository.emailVerificationToken(hashedToken);

  if (!record) {
    throw new ApiError(400, "Invalid or expired token");
  }

  await userRepository.updateUserVerified(record.userId);

  await emailVerificationRepository.deleteVerificationToken(record.id);

  return { verified: true };
};

export const resendVerification = async (email: string) => {
  const user = await userRepository.findUserByEmail(email);
  
  if (!user) {
    return;
  }

  if (user.emailVerified) {
    throw new ApiError(400, "Email already verified");
  }

  await emailVerificationRepository.deleteUserTokensRecords(user.id);

  const rawToken = generateToken();
  const hashedToken = hashToken(rawToken);

  await emailVerificationRepository.createEmailVerificationRecord({
    token: hashedToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  });

  await sendVerificationEmail(user, rawToken);
};