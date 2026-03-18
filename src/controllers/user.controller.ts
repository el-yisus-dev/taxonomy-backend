import type { Request, Response } from "express"
import * as userService from "../services/user.service.js"
import { getPagination } from "../utils/Pagination.js"

export const createUser = async (req: Request, res: Response) => {
  
  const user = await userService.createUser(req.body)

  return res.status(201).json({
    status: "success",
    data: {
      user
    }
  })
}

export const getUsers = async (req: Request, res: Response) => {
  const { page, limit, skip } = getPagination(req.query);
  
  const result = await userService.getUsers({
    page,
    limit,
    skip
  })

  res.json({
    status: "success",
    data: result.items,
    meta: result.meta
  })
}

export const updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    
    await userService.updateUser(id, req.body);

    return res.status(200).json({
      status: "success",
      data: {
        message: "User updated sucessfully",
      },
    });
}

export const getUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const user = await userService.getUserById(id)

    res.json({
      status: "success",
      data: user
    })
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  await userService.deleteUser(id)

  res.status(200).json({
    status: "success",
    data: {
      message: "User deleted successfully"
    }
  })
}
