import { assert } from 'chai';
import { expect } from 'chai';
import {describe,it,context} from 'mocha';
import { should } from 'chai';
import  server  from '../index';
import { error } from 'util';
should();

server.register([
    {
        register:require('inject-then')
}
])

const requestDefaults ={
    method:'POST',
    url:'/books',
    payload:{
        title:'book that contain pizza',
        author:'amarjot',
        genre:'pizza',
        isbn:'123',
        copies:[
            {
                editionDate:'12-03-2017',
                editionName:'second',
                issued:{
                    "isIssued": "true",
                    "issuedTo": "are we there yet",
                    "reserved": "false"
                }
            }
        ],
        "publication": {
            "cityPublished": "vancouver",
            "date": "12-21-2012",
            "publisher": "amarjot"
        }
    }
}





describe('Joi Validator',function(){

    it('should validate the correct entry of the book',function(){
             
            const request = Object.assign({},requestDefaults)

            return server.injectThen(request).then(function(response){
                expect(response.statusCode).to.deep.equal(201)
                
            }).catch(error=> {throw error})


        })


    it('should validate the correct entry of the book based on genre',function(){
        
       let request = {
        method:'GET',
        url:'/books/?genre=music'   
    }
    return server.injectThen(request).then(function(response){
        expect(response.statusCode).to.deep.equal(200)
        
    }).catch(error=> {throw error})

  })
})











// this was the lab testing code which didnt worked with hapi
// dont know why but i tried alot

// const Lab = require("lab");           // load Lab module
// const lab = exports.lab = Lab.script(); //export test script
// const chai = require('chai');
// const expect = chai.expect;
// const server = require('../index');
// const Code = require('code');

// const requestDefaults ={
//     method:'POST',
//     url:'/books',
//     payload:{
//         title:'this is the title of the book',
//         author:'amarjot',
//         genre:'pizza',
//         isbn:'123',
//         copies:[
//             {
//                 editionDate:'12-03-2017',
//                 editionName:'second',
//                 issued:{
//                     "isIssued": "true",
//                     "issuedTo": "are we there yet",
//                     "reserved": "false"
//                 }
//             }
//         ],
//         "publication": {
//             "cityPublished": "vancouver",
//             "date": "12-21-2012",
//             "publisher": "amarjot"
//         }
//     }
// }

// lab.experiment('Validation', function(){
//     lab.test('returns true when 1 + 1 equals 2', () => {

//                 const request = Object.assign({},requestDefaults)

//                 server.inject(request).then(function(response){
//                     Code.expect(response.statusCode).to.equal(200);
//                     // server.stop(done)
//                 })
//     });
// })