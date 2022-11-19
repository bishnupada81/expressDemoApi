require('dotenv').config();

const express = require('express');
const todosRouter = require('./routes/todos');

const app = express();

app.use(express.json());
app.use('/todos',todosRouter)

const port = process.env.PORT;

app.listen(port,()=>console.log(`server is started in port number${port}`))