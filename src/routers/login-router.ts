import express from 'express'
//no need to import ANY model because we are receiving the req!
import { getUserByUsernameAndPassword } from "../services/login-service"

export const loginRouter = express.Router()

function authUser(req,res) {
    let {username, password} = req.body
    if(!username || !password){
        res.status(400).send('Please enter a username and password')
    } 
    try {
        //add service method for getting username and pw to new file login-service
        let user = getUserByUsernameAndPassword(username, password)
        req.session.user = user
        res.json(user)
    }catch(e){
        res.status(e.status).send(e.message)
    } 
}

loginRouter.post('', authUser)