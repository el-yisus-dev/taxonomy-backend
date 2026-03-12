export interface CreateUserDTO {
  email: string
  username: string
  name: string
  lastName: string
  password: string
  cellphone?: string
}

export interface updateUserDTO extends Partial<Pick<CreateUserDTO, "name" | "lastName" | "cellphone">> {}