import { User } from '../model/user'
import { PoolClient } from 'pg'
import {  userDTOtoUser } from '../util/UserDTO-to-user'
import { connectionPool } from '.'
export async function daoGetUsernameAndPassword(username: string, password: string): Promise<User>{
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        const result = await client.query('SELECT * FROM prc.users natural join prc.users_roles natural join prc.roles WHERE username = $1 and "password" = $2 ',
        [username, password])
        console.log(result)
        if (result.rows !== null) {
            return userDTOtoUser(result.rows)
        } else {
            throw 'Bad Credentials'
        }
    } catch (e) {
        console.log(e)
        throw {
            status: 500,
            message: 'Dao Error'
        }
    } finally {
        client && client.release()
    }
}