import { PoolClient } from 'pg'
import { connectionPool } from '.'
import { multiReimbursementsDTOConverter, reimbursementDTOtoReimbursement } from '../util/ReimbursementDTO-to-reimbursement'
import { Reimbursement } from '../model/reimbursement'

export async function daoFindReimbursementsByStatus(status: number): Promise<Reimbursement[]>{
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        const result = await client.query('SELECT * FROM prc.reimbursements WHERE status = $1',
        [status])
        return multiReimbursementsDTOConverter(result.rows)
    } catch(e) {
        console.log(e)
        throw {
            status: 500,
            message: 'Dao Error'
        }
    } finally {
        client && client.release()
    }
}

export async function daoFindReimbursementsByUser(id: number): Promise<Reimbursement[]>{
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        const result = await client.query('SELECT * FROM prc.reimbursements WHERE author = $1',
        [id])
        return multiReimbursementsDTOConverter(result.rows)
    } catch(e) {
        console.log(e)
        throw {
            status: 500,
            message: 'Dao Error'
        }
    } finally {
        client && client.release()
    }
}

export async function daoPostReimbursement(r:Reimbursement): Promise<Reimbursement> {
    let client: PoolClient
    client = await connectionPool.connect()
    try {
        await client.query('BEGIN')
        const result = await client.query('INSERT INTO prc.reimbursements (author, amount, description, status) values ($1, $2, $3, $4) RETURNING reimbursement_id',
        [r.author, r.amount, r.description, r.status]) //need to get the author id from the login value??
        //struncture of rsm-status table should needs another column that matches status type as number??
        // await client.query('INSERT INTO prc.reimbursement_status(status_name) values ($1)',
        // ['PENDING'])
        //subtract the amount of the reimbursement from the 'author's' account; 
        //problem: do we have to convert currentBalance before working on it?

        /* 
            make the reimbursement in dao, then if we succeed, send reim_id back to service
            then send another request off to user dao from reimbursement service layer to 
            the user dao to make a request to update the account balance 
            
        */

        /*    let currentBalance:number = await client.query('SELECT account_balance FROM prc.reimbursements r natural join prc.users u WHERE user_id = $1 and author = $2',
            [r.author, r.author])
            let amount:number = r.amount
            console.log(currentBalance)
            const newBalance:number = currentBalance - amount
            await client.query('UPDATE prc.users SET account_balance = $1 WHERE user_id = $2',
            [newBalance, r.author])     */
        await client.query('COMMIT')
        r.reimbursementId = result.rows[0].reimbursement_id
        return r
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

export async function daoUpdateReimbursement(r:Reimbursement): Promise<Reimbursement> {
    let client: PoolClient
    client = await connectionPool.connect()
    try {
        await client.query('UPDATE prc.reimbursements SET author = $2, amount = $3, description = $4, status = $5 WHERE reimbursement_id = $1',
        [r.reimbursementId, r.author, r.amount, r.description, r.status])
        const result = client.query('SELECT * FROM prc.reimbursements WHERE reimbursement_id = $1',
        [r.reimbursementId])
        return reimbursementDTOtoReimbursement(result)
    } catch(e) {
        console.log(e)
        throw {
            status: e.status,
            message: e.message
        }
    } finally {
        client && client.release()
    }
}

