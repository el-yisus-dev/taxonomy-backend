import type { Request, Response } from "express"
import * as userService from "../services/user.service.js"

export const createUser = async (req: Request, res: Response) => {
  const { email, password, cellphone } = req.body

  await userService.createUser({ email, password, cellphone })

  return res.status(201).json({
    status: "success",
    data: {
      message: "User created successfully"
    }
  })
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();

  res.json({
    status: "success",
    data: users
  })
}

export const updateUser = async (req: Request, res: Response) => {
  res.status(302).json({
    status: "success",
    data: {
      message: "User updated successfully"
    }
  })
};

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

  res.status(204).send()
}