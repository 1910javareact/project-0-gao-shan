//no need for a dao repo yet b/c we are not reading/writing from database?
//no, still need a dao. NO NEED FOR A MODEL HERE
import { daoGetUsernameAndPassword } from "../repositories/login-dao"

export function getUserByUsernameAndPassword(username:string, password:string){
    return daoGetUsernameAndPassword(username, password)
}