import express from 'express'
import bodyparser from 'body-parser'
import { userRouter } from './routers/user-router'
import { loginRouter } from './routers/login-router'
import { receiptRouter } from './routers/receipt-router'
import { loggingMiddleware } from './middleware/logging-middleware'
import { sessionMiddleware } from './middleware/session-middleware'

const app = express()
app.use(bodyparser.json())
app.use(loggingMiddleware)
app.use(sessionMiddleware)

//this is where we put the requests to our routers

// app.use('/login', loginRouter)
app.use('/users', userRouter)
//make indidual endpoints for each user, authenticated through the login endpoint
app.use('/receipts', receiptRouter)
app.use('/login', loginRouter)


app.listen(1001, ()=>{
    console.log('app has started');   
})