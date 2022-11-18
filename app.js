const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


let todos = [
  {
    id: 1,
    task: 'Buy a coffee',
    isDone: true
  },
  {
    id: 2,
    task: 'Record a song',
    isDone: false
  }
];

app.get('/todos',(req,res)=>{
  try{
    res.status(200).json({
      success: true,
      message: 'todos fetched successfully!',
      data: todos
    })
  }
  catch(error){
    res.send('some thing wrong')
  }
  
})
app.get('/todos/:id', (req, res) => {
   
    const id = req.params.id;

    const todo = todos.find((todo) => todo.id === id);

    res.status(200).json({
        success: true,
        message: 'todo fetched successfully!',
        data: todo
    })
})

app.post('/todos', (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.status(200).json({
        success: true,
        message: 'data added successfully!',
        data: todo
    })
})
app.delete('/todos/:id',(req,res) => {
  const id = req.params.id;
  todos = todos.filter((todo)=> todo.id != id)
  res.status(200).json({
    success: true,
    message: 'data deleted successfully!',
    data: todos
  })
})

app.patch('/todos/:id',(req,res) => {
  const id = req.params.id;
  const todo = todos.find((todo)=> todo.id == id)
  const {task,isDone} = req.body; 
  if (!todo) {

    // if(task) todo.task = task;
    // if(isDone) todo.isDone = isDone;
    if(task && isDone) {
      todo.task = task;
      todo.isDone = isDone;
    }else if(task) {
      todo.task = task;
    }else if(isDone) {
      todo.isDone = isDone;
    }
    res.status(200).json({
      success: true,
      message: 'updated successfully!',
    })
  }else{
    res.status(404).json({
      success: false,
      message: 'data not found',
    })
  }
  
})

app.listen(3000)