import express from 'express';
import { findReimbursementsByStatus , findReimbursementsByUser, getAllReimbursements, submitReimbursement , updateReimbursement  } from '../service/reimbursement-service'
import { Reimbursement } from '../model/reimbursement';
import { auth } from '../middleware/auth-middleware'

export const reimbursementRouter = express.Router()

async function controllerGetAllReimbursements(req, res) {
    try {
        const reimbursements = await getAllReimbursements()
        res.json(reimbursements)
   } catch(e) {
        console.log(e)
        res.status(e.status).send(e.message);
   }
}
reimbursementRouter.get('', auth(['Finance Manager', 'Admin']), controllerGetAllReimbursements)

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
reimbursementRouter.get('/byStatus/:id', auth(['Finance Manager', 'Admin']), controllerFindReimbursementsByStatus)

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
reimbursementRouter.get('/byUser/:id', auth(['Finance Manager', 'Admin']), controllerFindReimbursementsByUser)

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

reimbursementRouter.post('/new-reimbursement', auth(['Finance Manager', 'Admin', 'User']), controllerSubmitReimbursement)

async function controllerUpdateReimbursement(req, res) {
    const { body } = req
    const updatedRe = new Reimbursement(0,0,0,'',0)
    for (const key in updatedRe){
        if (body[key] === undefined){
            res.status(400).send('Please ensure all fields are filled')
            break
        } else {
            updatedRe[key] = body[key]
        }
    }
    try {
        const reimbursement = await updateReimbursement(updatedRe)
        res.status.json(201).json(reimbursement)
    } catch(e) {
        console.log(e)
        res.status(e.status).send(e.message);
    }
}

reimbursementRouter.patch('/updateRe', controllerUpdateReimbursement)
 
