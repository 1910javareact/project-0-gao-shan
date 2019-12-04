import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { userDTOtoUser, multiUserDTOConverter } from '../util/UserDTO-to-user';
import { User } from '../model/user';

export async function daoGetAllUsers(): Promise<User[]>{
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        console.log("got to the try point with the connectionto the db")
        const result = await client.query('SELECT * FROM prc.users natural join prc.users_roles natural join prc.roles');
        return multiUserDTOConverter(result.rows);
    } catch (e) {
        console.log(e);
        throw {
            status: 500,
            message: 'Dao Error'
        }
    } finally {
        client && client.release();
    }
}

export async function daoGetUserById(id: number): Promise<User> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        const result = await client.query('SELECT * FROM prc.users natural join prc.users_roles natural join prc.roles where user_id = $1', [id])
        if (result.rowCount > 0) {
            return userDTOtoUser(result.rows)
        } else {
            throw 'User does not exist'
        }
    } catch(e) {
        if (e === 'User does not exist') {
            throw {
                status: 404,
                message: 'This user does not exist'
            }
        } else {
            throw {
                status: 500,
                message: 'Internal Server Error'
            }
        }
    } finally {
        client && client.release()
    }
}

export async function daoSaveOneUser(u: User): Promise<User> {
    let client: PoolClient
    client = await connectionPool.connect()
    try {
        await client.query('BEGIN')
        const result = await client.query('INSERT INTO prc.users ("name", username, "password", account_balance, social_credit) values ($1, $2, $3, $4, $5) RETURNING user_id',
        [u.name, u.username, u.password, u.accountBalance, u.socialCredit])
        for (const r of u.role){
            let roleId = 0
            switch (r){
                case 'Admin':
                    roleId = 1
                    break;
                case 'Finance Manager':
                    roleId = 2
                    break
                default:
                    roleId = 3
                    break
            }
            await client.query('INSERT INTO prc.users_roles VALUES($1,$2)',
            [result.rows[0].user_id, roleId])
        }
        u.userId = result.rows[0].user_id
        await client.query('COMMIT')
        return u
    } catch(e) {
        await client.query('ROLLBACK')
        console.log(e)
        throw {
            status: 500,
            message: 'Internal Server Error'
        }
    } finally {
        client && client.release()
    }
}

// export async function daoUpdateUser(u:User[]): Promise<User[]> {

// }

