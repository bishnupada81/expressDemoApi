require('dotenv').config();

const express = require('express');
const todosRouter = require('./routes/todos');
const loginRegisterRouter = require('./routes/login_registration');

const app = express();

app.use(express.json());
app.use('/todos',todosRouter)
app.use('/auth',loginRegisterRouter)

const port = process.env.PORT;

app.listen(port,()=>console.log(`server is started in port number http://localhost:${port}`))