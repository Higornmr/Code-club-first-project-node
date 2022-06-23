
/*  
    - Query params => meusite.com/users?name=rodolfo&age=28   //FILTORS 
    - Route params => /users/2         // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO  
    - Request Body => {"name":"Rodolfo","age":}  

    - GET           => Buscar informação no back-end
    - POST          => Criar informação no back-end
    - PUT / PATCH   => Alterar/Atualizar informção no back-end
    - DELETE        => Deletar informação no back-end

    - Middleware    => INTERCEPTADOR  => Tem o poder de para ou alterar dados da requisição
*/

const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

/*-----------------------------------------QUERY PARAMS-----------------------------------------
  app.get('/users', (request, response)=>{
  const {name, age} = request.query  /* pode criar a a const assim: const {name, age} = request.query - se chama DESTRUCTURING ASSIGNMENT 
  return response.json({ name, age}) /*quando o nome da chave e do objeto é igual pode deixar só o nome do objeto  exp ({name, age})
})  
*/
/*-----------------------------------------ROUTE PARAMS-----------------------------------------
  app.get('/users/:id', (request, response)=>{
      
      const {id} =request.params

      console.log(id)
      return response.json({id})
  })
*/
/*-----------------------------------------REQUEST BODY-----------------------------------------
app.get('/users', (request, response)=>{

  const {name, age} = request.body
 
  return response.json({name, age})  
})
*/
/*----------------------------------------------GET---------------------------------------------
const users = []

app.get('/users', (request, response)=>{
  return response.json(users)  
})
app.post('/users', (request, response)=>{
  const { name, age } = request.body

  const user = { id:uuid.v4(), name, age}

  users.push(user)

  return response.status(201).json(user)  
})
app.listen(port, () =>{
  console.log(`🚀 👨‍💻 Server started on port ${port}`)
})

*/
/*----------------------------------------------PUT---------------------------------------------
const users = []

app.get('/users', (request, response)=>{
  return response.json(users)  
})
app.post('/users', (request, response)=>{
  const { name, age } = request.body

  const user = { id:uuid.v4(), name, age}

  users.push(user)

  return response.status(201).json(user)  
})

app.put('/users/:id', (request, response)=>{
  const {id} = request.params
  const {name, age} = request.body

  const updateUser = {id, name, age}
  
  const index = users.findIndex (user => user.id === id)

  if(index < 0){
      return response.status(404).json({message: "User not found"})
  }
  
  users[index] = updateUser

  return response.json(updateUser)  
})
*/
/*---------------------------------------------DELET--------------------------------------------
const users = []

app.get('/users', (request, response)=>{
  return response.json(users)  
})
app.post('/users', (request, response)=>{
  const { name, age } = request.body

  const user = { id:uuid.v4(), name, age}

  users.push(user)

  return response.status(201).json(user)  
})

app.put('/users/:id', (request, response)=>{
  const {id} = request.params
  const {name, age} = request.body

  const updateUser = {id, name, age}
  
  const index = users.findIndex (user => user.id === id)

  if(index < 0){
      return response.status(404).json({message: "User not found"})
  }
  
  users[index] = updateUser

  return response.json(updateUser)  
})

app.delete('/users/:id', (request, response)=>{
  const {id} = request.params

  const index = users.findIndex (user => user.id === id)

  if(index < 0){
      return response.status(404).json({message: "User not found"})
  }

  users.splice(index,1)

  return response.status(204).json()  
})
*/
/*---------------------------------------------Middleware---------------------------------------
const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})
*/

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})




















app.listen(port, () => {
    console.log(`🚀 👨‍💻 Server started on port ${port}`)
})
