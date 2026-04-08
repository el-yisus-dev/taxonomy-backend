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

  return res.status(200).json({
    status: "success",
    message: "Email verified successfully"
  });
};