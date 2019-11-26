
export class User {
    userId: number;
    name: string;
    username: string;
    password: string;
    accountBalance: number;
    socialCredit: number;
    role: string[]; /* we are going to pass the role object as a string, and validate/write values in DB*/
    constructor(userId: number, name: string, username: string, password: string, accountBalance: number, socialCredit: number, role: string[]){
        this.userId = userId;
        this.name = name;
        this.password = password;
        this.username = username;
        this.accountBalance = accountBalance;
        this.socialCredit = socialCredit;
        this.role = role;
    }
}