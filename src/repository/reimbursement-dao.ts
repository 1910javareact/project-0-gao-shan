import { PoolClient } from 'pg'
import { connectionPool } from '.'
import { /*reimbursementDTOtoReimbursement,*/ multiReimbursementsDTOConverter } from '../util/ReimbursementDTO-to-reimbursement'
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
        const result = await client.query('SELECT * FROM prc.reimbursements WHERE reimbursement_id = $1',
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