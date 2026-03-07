import type { Request, Response } from "express"
import * as userService from "../services/user.service.js"

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body)

    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers()
  res.json(users)
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    const user = await userService.getUserById(id)

    res.json(user)
  } catch (error) {
    res.status(404).json({ error: (error as Error).message })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  await userService.deleteUser(id)

  res.status(204).send()
}