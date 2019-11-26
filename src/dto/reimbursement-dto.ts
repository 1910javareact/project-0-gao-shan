export class ReimbursementDTO {
    reimbursement_id: number // primary key
    author: number  // foreign key -> User, not null
    amount: number  // not null
//    date_submitted: number // not null
  //  date_resolved: number // not null
    description: string // not null
 //s   resolver: number// foreign key -> User
    status: number // foreign ey -> ReimbursementStatus, not null
//    type: number
}