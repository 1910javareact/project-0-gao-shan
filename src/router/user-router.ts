import express from 'express';
import { User } from '../model/user'
import { getAllUsers, getUserById, saveOneUser } from '../service/user-service';

export const userRouter = express.Router();

async function controllerGetUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (e) {
        console.log(e);
        res.status(e.status).send(e.message);
    }
}

userRouter.get('', controllerGetUsers);

async function controllerGetUserById(req, res){
    const id = +req.params.id
    if (isNaN(id)){
        res.sendStatus(400)
    } else {
        try {
            const user = await getUserById(id)
            res.json(user)
        } catch(e) {
            console.log(e);
            res.status(e.status).send(e.message);
        }
    }
}

userRouter.get('/:id', controllerGetUserById)

async function controllerSaveOneUser(req, res){
    const { body } = req
    const newUser = new User(0,'','','',0,0,[])
    for (const key in newUser){
        if (body[key] === undefined) {
            res.status(400).send('Make sure you filled out all the fields')
            break
        } else {
            newUser[key] = body[key]
        }
    }
    try {
        const user = await saveOneUser(newUser)
        res.status(201).json(user)
    } catch (e) {
        console.log(e)
        res.status(e.status).send(e.message)
    }
}

userRouter.post('', controllerSaveOneUser)