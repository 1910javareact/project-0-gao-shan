import { User } from "./user"
import { RStatus } from "./receipt-status"
import { RType } from "./receipt-type"
export class Receipt {
        reimbursementId: number // primary key
        author: User  // foreign key -> User, not null
        amount: number  // not null
        dateSubmitted: number // not null
        dateResolved: number // not null
        description: string // not null
        status: RStatus // foreign ey -> ReimbursementStatus, not null
        type: RType // foreign key -> ReimbursementType
        constructor(reimbusementId:number, author: User, amount: number, dateSubmitted: number, dateResolved: number, description: string, status: RStatus, type: RType){
            this.reimbursementId = reimbusementId
            this.author = author
            this.dateSubmitted = dateSubmitted
            this.dateResolved = dateResolved
            this.description = description
            this.status = status
            this.type = type
        }
}