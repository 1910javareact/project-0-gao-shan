import express from 'express'
import bodyparser from 'body-parser'
import { userRouter } from './routers/user-router'

const app = express()
app.use(bodyparser.json())

//this is where we put the requests to our routers

// app.use('/login', loginRouter)
app.use('/users', userRouter)


app.listen(1001, ()=>{
    console.log('app has started');   
})