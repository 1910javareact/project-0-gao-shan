import { users } from "../database"

export function daoGetUsernameAndPassword(username: string, password: string){
    for(let u of users){
        if(u.username === username && u.password === password){
            return u
        }
    }
    throw {
        status: 401,
        message: 'Bad credentials'
    }
}