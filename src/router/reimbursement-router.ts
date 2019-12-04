import express from 'express';
//import { User } from '../model/user'
//import { Reimbursement } from '../model/reimbursement'
import { findReimbursementsByStatus , findReimbursementsByUser, submitReimbursement /*, updateReimbursement */ } from '../service/reimbursement-service'
import { Reimbursement } from '../model/reimbursement';
import { auth } from '../middleware/auth-middleware'

export const reimbursementRouter = express.Router()

async function controllerFindReimbursementsByStatus(req, res) {

    const status = +req.params.id
    if (isNaN(status)){
        res.sendStatus(400)
    }
    try {
        const reimbursement = await findReimbursementsByStatus(status)
        res.json(reimbursement)
    } catch(e) {
        console.log(e)
        res.status(e.status).send(e.message);
    }
}
reimbursementRouter.get('/byStatus/:id', auth(['Finance Manager']), controllerFindReimbursementsByStatus)

async function controllerFindReimbursementsByUser(req, res) {
    const id = +req.params.id
    if (isNaN(id)){
        res.sendStatus(400)
    }
    try {
        const reimbursement = await findReimbursementsByUser(id)
        res.json(reimbursement)
   } catch(e) {
        console.log(e)
        res.status(e.status).send(e.message);
   }
}
reimbursementRouter.get('/byUser/:id', controllerFindReimbursementsByUser)

async function controllerSubmitReimbursement(req, res) {
    const { body } = req
    const newReimbursement = new Reimbursement(0, 0, 0, '', 0)
    for (const key in newReimbursement){
        if (body[key] === undefined) {
            res.status(400).send('Make sure to fill out all of your fields')
            break
        } else {
            newReimbursement[key] = body[key]
        }
    }
    try {
        const reimbursement = await submitReimbursement(newReimbursement)
        res.status(201).json(reimbursement)
    } catch(e) {
        console.log(e)
        res.status(e.status).send(e.message);
    }
}

reimbursementRouter.post('/new-reimbursement', controllerSubmitReimbursement)

// async function controllerUpdateReimbursement(req, res) {
    
//     try {
//         return await updateReimbursement
//     } catch(e) {
//         console.log(e)
//         res.status(e.status).send(e.message);
//     }
// }

// reimbursementRouter.patch('', controllerUpdateReimbursement)
 
