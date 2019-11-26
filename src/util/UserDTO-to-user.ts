import { UserDTO } from '../dto/user-dto';
import { User } from '../model/user';

export function userDTOtoUser(user: UserDTO[]): User {
    const roles = [];
    for (const u of user){
        roles.push(u.role_name);
    }
    return new User(
        user[0].user_id,
        user[0].name,
        user[0].password,
        user[0].username,
        user[0].account_balance,
        user[0].social_credit,
        roles);
}

export function multiUserDTOConverter(user: UserDTO[]): User[]{
    let currentUser: UserDTO[] = [];
    const result: User[] = [];
    for (const u of user){
        if (currentUser.length === 0){
            currentUser.push(u);
        } else if (currentUser[0].user_id === u.user_id) {
            currentUser.push(u);
        } else {
            result.push(userDTOtoUser(currentUser));
            currentUser = [];
            currentUser.push(u);
        }
    }
    result.push(userDTOtoUser(currentUser));
    return result;
}