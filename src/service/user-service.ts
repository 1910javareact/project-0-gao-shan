import { User } from '../model/user';
import { daoGetAllUsers, daoGetUserById, daoSaveOneUser } from '../repository/user-dao';

export async function getAllUsers(): Promise<User[]> {
    try {
        return await daoGetAllUsers();
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function getUserById(id): Promise<User> {
    try {
        return await daoGetUserById(id)
    } catch(e) {
        console.log(e)
        throw e
    }
}

export async function saveOneUser(u:User): Promise<User> {
    try {
        return await daoSaveOneUser(u)
    } catch (e) {
        console.log(e)
        throw e
    }
}