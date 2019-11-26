import express from 'express';
//import { User } from '../model/user'
//import { Reimbursement } from '../model/reimbursement'
import { findReimbursementsByStatus , findReimbursementsByUser, /*submitReimbursement, updateReimbursement */ } from '../service/reimbursement-service'

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
reimbursementRouter.get('/byStatus/:id', controllerFindReimbursementsByStatus)

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

// async function controllerSubmitReimbursement(req, res) {
    
//     try {
//         return await submitReimbursement
//     } catch(e) {
//         console.log(e)
//         res.status(e.status).send(e.message);
//     }
// }

// reimbursementRouter.post('', controllerSubmitReimbursement)

// async function controllerUpdateReimbursement(req, res) {
    
//     try {
//         return await updateReimbursement
//     } catch(e) {
//         console.log(e)
//         res.status(e.status).send(e.message);
//     }
// }

// reimbursementRouter.patch('', controllerUpdateReimbursement)
 
