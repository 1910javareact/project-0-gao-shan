export class Reimbursement {
    reimbursementId: number // primary key
    author: number  // foreign key -> User, not null
    amount: number  // not null
//    dateSubmitted: number // not null
//    dateResolved: number // not null
    description: string // not null
//    resolver: number// foreign key -> User
    status: number // foreign ey -> ReimbursementStatus, not null
//    type: number // foreign key -> ReimbursementType
    constructor(reimbursementId: number, author: number, amount: number, description: string, status: number){
        this.reimbursementId = reimbursementId
        this.author = author
        this.amount = amount
//        this.dateSubmitted = dateSubmitted
  //      this.dateResolved = dateResolved
    //    this.resolver = resolver
        this.description = description
        this.status = status
      //  this.type = type
    }
}