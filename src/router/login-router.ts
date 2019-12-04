import express from 'express'
import { getUserByUsernameAndPassword } from '../service/login-service'

export const loginRouter = express.Router()

export async function authUser(req, res) {
    let { username, password } = req.body
    console.log(username)
    console.log(password)
    if (!username || !password){
        res.status(400).send('Please enter a username and password');
    }
    try {
        const user = await getUserByUsernameAndPassword(username, password);
        req.session.user = user;
        res.json(user);
    } catch(e) {
        res.status(e.status).send(e.message);
    } 
}

loginRouter.get('', authUser)