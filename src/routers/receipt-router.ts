import express from 'express'
//here we import functions from our receipt-service file

//import models to use in router
import { Receipt} from '../models/receipt'
import { User } from '../models/user'

export const receiptRouter = express.Router()

function getAllReceipts(req, res)
