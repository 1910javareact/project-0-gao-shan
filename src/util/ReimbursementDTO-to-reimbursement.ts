import { ReimbursementDTO } from '../dto/reimbursement-dto'
import { Reimbursement } from '../model/reimbursement'

export function reimbursementDTOtoReimbursement(reimbursement: ReimbursementDTO[]): Reimbursement {
    return new Reimbursement(
        reimbursement[0].reimbursement_id,
        reimbursement[0].author,
        reimbursement[0].amount,
        reimbursement[0].description,
        reimbursement[0].status
    )
}

export function multiReimbursementsDTOConverter(reimbursement: ReimbursementDTO[]): Reimbursement[]{
    let currentReimbursement: ReimbursementDTO[] = []
    const result: Reimbursement[] = []
    for (const r of reimbursement){
        if (currentReimbursement.length === 0){
            currentReimbursement.push(r)
        } else if (currentReimbursement[0].reimbursement_id === r.reimbursement_id){
            currentReimbursement.push(r)
        } else {
            result.push(reimbursementDTOtoReimbursement(currentReimbursement))
            currentReimbursement = []
            currentReimbursement.push(r)
        }
    }
    result.push(reimbursementDTOtoReimbursement(currentReimbursement))
    return result
}