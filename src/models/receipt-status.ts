export class RStatus{
    statusId: number // primary key
    status: string // not null, unique; `Pending`, `Approved`, or `Denied`.
    constructor(statusId: number, status: string){
        this.statusId = statusId
        this.status = status
    }
}