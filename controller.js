require('dotenv').config()

const models = require('./models')

module.exports ={
  getHome:getHome,
  getBooks:getBooks,
  getBooksId:getBooksId,
  postBooks:postBooks,
  updateBooks:updateBooks,
  deleteBooks:deleteBooks,
  queryBooks:queryBooks,
  getAllUsers:getAllUsers,
  getSingleUser:getSingleUser,
  updateUser:updateUser,
  createUser:createUser,
  deleteUser:deleteUser,
  queryUsers:queryUsers
}

function getHome(req,res){
  return res("welcome to book lending api")
}
async function getBooks(req,res){
  let allBooks = await models.students.find({},{limit:10})
  return res(allBooks).code(200)
}
async function getBooksId(req,res){
  let typicalBook = await models.students.find({"isbn":req.params.isbn})
  return res(typicalBook).code(200)

}
async function postBooks(req,res){
  let newBook = await models.students.insert(req.payload)
  return res(req.payload).code(201)
}
async function updateBooks(req,res){
  let bookToUpdate = await models.students.findOneAndUpdate({"isbn":req.payload['isbn']},{$set:req.payload})
  return res(req.payload).code(200)
}
async function deleteBooks(req,res){
  let bookToDelete = await models.students.findOneAndDelete({"isbn":req.params.isbn})
  return res(bookToDelete).code(200)
}
async function queryBooks(req,res){
  console.log(req.query);
  if(req.query.genre){
    let queryBooksResult = await models.students.find({"genre":req.query.genre})
    if(Object.keys(queryBooksResult)){
      return res(queryBooksResult).code(200)
    }else{
      return res('please correct the query format').code(404)
    }
  }

  if(req.query.lateFee){
    lesearchueryBooksResult = await models.students.find({"title":{$regex:req.query.title,$options:'i'}})
    if(Object.keys(lesearchueryBooksResult)){
      return res(queryBooksResult).code(200)
    }else{
      return res('please correct the query format').code(404)
    }
  }

  if(req.query.author){
    let queryBooksResult = await models.students.find({"author":req.query.author})
    if(Object.keys(queryBooksResult)){
      return res(queryBooksResult).code(200)
    }else{
      return res('please correct the query format').code(404)
    }
  }
}


// /////////////////////////////////////////////////////////////////////


async function getAllUsers(req,res){
  let allUsers= await models.users.find({},{limit:5})
  return res(allUsers)
}
async function getSingleUser(req,res){
/// make change so that each email is unique
  let allUsers= await models.users.find({"email":req.params.email})
  return res(allUsers).code(200)
}
async function updateUser(req,res){
  let updatedUsers= await models.users.findOneAndUpdate({"email":req.payload['email']},{$set:req.payload})
  return res(updatedUsers).code(200)
}
async function createUser(req,res){
  let newUser= await models.users.insert(req.payload)
  await models.users.index({email:1},{unique:true})
  return res(newUser).code(200)
}
async function deleteUser(req,res){
  let delUser = await models.users.findOneAndDelete({"email":req.params.email})
  return res(delUser).code(200)
}
async function queryUsers(req,res){
  if(req.query.lateFee){
    //make changes here so that only late fee users are returned
  let searchUser = await models.users.find({"lateFee":{$gt:0}})
  return res(searchUser).code(200)
}}
