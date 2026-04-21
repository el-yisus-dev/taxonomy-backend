import bcrypt from "bcrypt";

import * as userRepository from "../repositories/user.repository.js";
import * as emailVerificationRepository from "../repositories/emailVerification.repository.js";
import * as resetRepo from "../repositories/passwordReset.repository.js";

import type { LoginData } from "../types/User.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessToken } from "../utils/Jwt.js";
import { generateToken, hashToken } from "../utils/TokenEmail.js";
import { sendResetPasswordEmail, sendVerificationEmail } from "./email.service.js";
import { generateOTP } from "../utils/OTP.js";
import { hashPassword } from "../utils/Hashpassord.js";


export const validateUserCredentials = async (data: LoginData) => {
  const { identifier, password } = data;

  const user = await userRepository.findUserWithPassword(identifier);

  if (user === null || user === undefined) {
    throw new ApiError(401, "User not found.");
  }
  
  if (!user.emailVerified) {
    throw new ApiError(401, "Your account is not verified.");
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


export const requestPasswordReset = async (email: string) => {
  const user = await userRepository.findUserByEmail(email);
    
  if (!user) return;

  if (!user.emailVerified) {
    throw new ApiError(401, "Your account is not verified.");
  }

  await resetRepo.deleteUserResetTokens(user.id);

  const otp = generateOTP();

  const hashed = hashToken(otp);

  await resetRepo.createPasswordResetToken({
    token: hashed,
    userId: user.id,
    expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 min
  });

  await sendResetPasswordEmail(user, otp);
};


export const resetPassword = async (
  email: string,
  code: string,
  newPassword: string
) => {
  const user = await userRepository.findUserByEmail(email);
    
  if (!user) {
    throw new ApiError(400, "Invalid code or email");
  }

  if (!user.emailVerified) {
    throw new ApiError(401, "Your account is not verified.");
  }

  const record = await resetRepo.findLatestByUser(user.id);

  if (!record) {
    throw new ApiError(400, "Invalid or expired code");
  }

  if (record.attempts >= 5) {
    throw new ApiError(400, "Too many attempts");
  }

  const hashed = hashToken(code);

  if (record.token !== hashed) {
    await resetRepo.incrementAttempts(record.id);
    throw new ApiError(400, "Invalid code");
  }

  const password = await hashPassword(newPassword);

  await userRepository.updateUserPassword(user.id, password);

  await resetRepo.deleteResetToken(record.id);

  return { success: true };
};