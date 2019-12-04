import { User } from '../model/user'
import { PoolClient } from 'pg'
import {  multiUserDTOConverter } from '../util/UserDTO-to-user'
import { connectionPool } from '.'
export async function daoGetUsernameAndPassword(username: string, password: string): Promise<User[]>{
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        const result = await client.query('SELECT * FROM prc.users u natural join prc.users_roles natural join prc.roles  WHERE "password" = $1 and username = $2',
        [password, username])
        if (result.rows !== null) {
            return multiUserDTOConverter(result.rows)
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