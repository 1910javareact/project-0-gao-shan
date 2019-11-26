//no need for a dao repo yet b/c we are not reading/writing from database?
//no, still need a dao. NO NEED FOR A MODEL HERE
import { User } from '../model/user'
import { daoGetUsernameAndPassword } from '../repository/login-dao';

export async function getUserByUsernameAndPassword(username: string, password: string): Promise<User[]>{
    try {
        let result = await daoGetUsernameAndPassword(username, password);
        return result
    } catch(e) {
        console.log(e)
        throw e
    }
}

