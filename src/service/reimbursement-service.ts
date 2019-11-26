import { daoFindReimbursementsByStatus, daoFindReimbursementsByUser } from "../repository/reimbursement-dao";
import { Reimbursement } from "../model/reimbursement";


export async function findReimbursementsByStatus(status): Promise<Reimbursement[]>{
    try {
        return await daoFindReimbursementsByStatus(status)
    } catch(e) {
        console.log(e)
        throw e
    }
}

export async function findReimbursementsByUser(id: number): Promise<Reimbursement[]>{
    try {
        return await daoFindReimbursementsByUser(id)
    } catch(e) {
        console.log(e)
        throw e
    }
}

// export async function submitReimbursement (){

// }

// export async function updateReimbursement(){

// }