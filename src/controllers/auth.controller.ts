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