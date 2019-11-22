export class Role {
    roleId: number // primary key
    role: string // not null, unique // two types : finance mgr and employee; employee cannot access mgr endpoint; not null
    constructor(roleId: number, role: string){
        this.roleId = roleId
        this.role = role
    }
}