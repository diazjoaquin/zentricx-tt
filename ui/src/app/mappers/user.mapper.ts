import { IUserFormData } from "../interfaces/IUserFormData";

export function fromUserFormToData (body: IUserFormData) {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
  }
}