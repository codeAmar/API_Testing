require('dotenv').config()

const hapi = require( 'hapi');
const server = new hapi.Server()


server.connection({
  host:'localhost',
  port:Number(process.env.PORT || 8080 )
})

server.route(require('./routes'))

server.start((err)=>{if (err) console.log('error while connecting :'+err)})
