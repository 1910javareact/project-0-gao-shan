import express from 'express';
import bodyparser from 'body-parser';
import { userRouter } from './router/user-router';
import { loggingMiddleware } from './middleware/logging-middleware';
import { sessionMiddleware } from './middleware/session-middleware';
import { getUserByUsernameAndPassword } from './service/login-service';
import { reimbursementRouter } from './router/reimbursement-router'

const app = express();

app.use(bodyparser.json());
app.use(loggingMiddleware);
app.use(sessionMiddleware);

async function authUser(req, res) {
    let {username, password} = req.body
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
app.post('/login', authUser);
app.use('/users', userRouter);
app.use('/reimbursement', reimbursementRouter)

app.listen(8888, () => {
    console.log('app has started');
});