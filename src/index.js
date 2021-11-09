const express = require('express');
const cors = require('cors');
const { v4: uuidv4, v5: uuidv5 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find(user => user.username === username);
  
  if(!user){
    return response.status(404).json({ error: "User not found!"});
  }

  request.user = user;
  return next();
}

function validatePass(request, response, next) {
  // The password on body will be: Ignite@

  const { password } = request.body;

  const keyConverted = "89b7d5c8-de86-5079-8d47-6df19e97e192";
  const SEED = "c03901ad-b610-495f-8caf-b9069186eb97";
  
  if(!password){
    return response.status(401).json({ error: "Empty Password. Unauthorized."});
  }

  const validatePass = uuidv5(password, SEED);
  if(validatePass != keyConverted){
    return response.status(401).json({ error: "Incorrect Password. Unauthorized."});
  }

  return next();
}

app.get('/users', validatePass, (request, response) => {
  return response.status(200).json(users);
})

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlredyExists = users.some((user) => user.username === username);

  if (userAlredyExists){
    return response.status(400).json({ error: "User already exists!"});
  }

  newUser = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const todo = {
    id: uuidv4(),
    title: title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const id = request.params.id; 
  const { title, deadline } = request.body;
  const { user } = request;

  const todo = user.todos.find(todo => todo.id === id);

  if(!todo){
    return response.status(404).json({ error: "ToDo not found."});
  }
  
  todo.title = title;
  todo.deadline = deadline;

  return response.status(200).json(todo)
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const id = request.params.id; 
  const { user } = request;

  const todo = user.todos.find(todo => todo.id === id);

  if(!todo){
    return response.status(404).json({ error: "ToDo not found."});
  }
  
  todo.done = true;

  return response.status(200).json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const id = request.params.id; 
  const { user } = request;

  const todo = user.todos.find(todo => todo.id === id);

  if(!todo){
    return response.status(404).json({ error: "ToDo not found."});
  }
  
  user.todos.splice(todo, 1);

  return response.status(204).send()
});

module.exports = app;