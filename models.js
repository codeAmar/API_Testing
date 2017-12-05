require('dotenv').config()

const joi = require('joi')
const monk = require('monk')
const db = monk(process.env.DB_URL)

db.then((err)=>{
  if(err) console.log('error :'+err);
  console.log('connected : db');

})

const students = db.get('books')

const users = db.get('users')

const usersSchema = {
  name:joi.string().required().max(30),
  email:joi.string().required().email(),
  booksBorrowed:joi.array().items(joi.object().keys({
    dueDate:joi.date().optional().when('borrowed',{
      is:joi.valid(),
      then:joi.required()}),
    borrowed:joi.string().optional()
  }).and('dueDate','borrowed')).optional(),
  booksReserved:joi.string().optional(),
  lateFee:joi.number().precision(2).optional()
}

const bookSchema = {
  title:joi.string().required().max(30),
  isbn:joi.string().required().max(20),
  author:joi.string().required().max(30),
  genre:joi.string().required().max(20),
  publication:joi.object().keys({
    // note - date act as string in httpie
    date:joi.date(),
    publisher:joi.string().required(),
    cityPublished:joi.string()
  }),
  copies:joi.array().items(joi.object().keys({
    editionName:joi.string().required().max(20),
    editionDate:joi.date(),
    issued:joi.object().keys({
      isIssued:joi.boolean().truthy('yes').falsy('no').required().when('reserved',{
        is:true,
        then:joi.invalid(joi.ref('reserved'))
      }),
      issuedTo:joi.string().empty(' ').default('not applicable'),
      reserved:joi.boolean().truthy('yes').falsy('no').optional()
    })
  })).min(1).required()
}

module.exports = {
  students:students,
  bookSchema:bookSchema,
  users:users,
  usersSchema:usersSchema
}


// echo '{"title":"book1", "isbn":"12345", "author":"amar", "genre":"music", "publication":{"date":"12-21-2012","publisher":"ravi","cityPublished":"vancouver"},"copies":[{"editionName":"first","editionDate":"12-13-2013","issued":{"isIssued":"true","issuedTo":"amarjot","reserved":"false"}}]}' | http  :3000/books



// echo '{ "email":"amarjotsingh90@yahoo.com","name":"amarjot singh","booksReserved":"node8","booksBorrowed":[{"borrowed":"javascript","dueDate":"12-13-2013"}],"lateFee":"300"}' | http POST :3000/users
