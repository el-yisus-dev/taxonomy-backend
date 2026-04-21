import type { Request, Response } from "express"

import * as authService from "../services/auth.service.js"

export const login = async (req: Request, res: Response) => {
    
    const { user, accessToken }  = await authService.validateUserCredentials(req.body);
    
    res.status(200).json({
      status: "success",
      data: { 
        user, 
        accessToken 
    }});
}

export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.query.token as string;
  
  await authService.verifyEmail(token);

  res.status(200).json({
    status: "success",
    message: "Email verified successfully"
  });
};

export const resendVerification = async (req: Request, res: Response) => {
  const { email } = req.body as { email: string };

  await authService.resendVerification(email);

  return res.status(201).json({
    status: "success",
    message: "If the email exists, a verification email was sent",
  });
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body as { email: string };

  await authService.requestPasswordReset(email);

  return res.status(201).json({
    status: "success",
    message: "If the email exists, a reset code was sent",
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, code, password } = req.body;

  await authService.resetPassword(email, code, password);

  return res.status(201).json({
    status: "success",
    message: "Password updated successfully",
  });
};