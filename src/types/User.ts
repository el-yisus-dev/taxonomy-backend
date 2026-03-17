export interface CreateUserDTO {
  email: string
  username: string
  name: string
  lastName: string
  password: string
  cellphone?: string
}

export interface LoginData {
  identifier: string;
  password: string;
}

export enum Role {
  USER = "USER",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

export interface updateUserDTO extends Partial<Pick<CreateUserDTO, "name" | "lastName" | "cellphone">> {}