import { User } from "../models/user"
import { users } from "../database"

export function daoGetAllUsers():User[]{
    return users
}

export function daoSaveOneUser(u:User){
    users.push(u)
    return true
}