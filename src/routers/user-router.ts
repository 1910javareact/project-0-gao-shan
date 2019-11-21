import express from 'express'
import { getAllUsers, saveOneUser } from "../services/user-service"
import { User } from '../models/user'

export const userRouter = express.Router()

function controllerGetUsers(req, res) {
    let users = getAllUsers()
    if (users) {
        res.json(users)
    }
    else {
        res.sendStatus(500)
    }
}
userRouter.get('', controllerGetUsers)

function controllerSaveUser(req, res) {
    let { body } = req
    let newU = new User(0, '', '', '', '', '', '')
    for (let key in newU) {
        if (body[key] = undefined) {
            res.sendStatus(400)
        }
        else {
            newU[key] = body[key]
        }
    }
    if (saveOneUser(newU)) {
        res.sendStatus(201)
    } else {
        res.sendStatus(400)
    }
}



userRouter.put('', controllerSaveUser)
