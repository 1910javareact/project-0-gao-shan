import express from 'express';
import bodyparser from 'body-parser';
import { userRouter } from './router/user-router';
import { loggingMiddleware } from './middleware/logging-middleware';
import { corsFilter } from './middleware/corsFilter'
import { sessionMiddleware } from './middleware/session-middleware';
import { authUser } from './router/login-router';
import { reimbursementRouter } from './router/reimbursement-router'

const app = express();

app.use(bodyparser.json());
app.use(loggingMiddleware);
app.use(corsFilter)
app.use(sessionMiddleware);

app.use('/users', userRouter);
app.use('/reimbursement', reimbursementRouter);
app.use('/login', authUser);

app.listen(8888, () => {
    console.log('app has started');
});