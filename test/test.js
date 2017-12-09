import { assert } from 'chai';
import { expect } from 'chai';
import { describe , it , context } from 'mocha';
import { should } from 'chai';
import  server  from '../index';
import models from '../models'
import { error } from 'util';
import { request } from 'http';
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
        author:'nelsonLovesMandella',
        genre:'pizza',
        isbn:'213',
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

// This suite test for the successful status of server and database
describe('Server and Database Status',function(){

    describe('Server Testing',function(){
        it('should validate if server is running',function(){
            return server.injectThen({
                method:'GET',
                url:'/'
            })
            .then(
                function(response){
                    expect(response.statusCode).to.deep.equal(200);
                }
            )
        })
        it('should invalidate if server is running',function(){
            return server.injectThen({
                method:'GET',
                url:'/'
            })
            .then(
                function(response){
                    expect(response.statusCode).to.not.deep.equal(400);
                }
            )
        })
    })

    describe('Database Testing',function(){
        it('should validate if the database is connected',function(){
            
            expect(models.db).to.have.property('_state','open');     

        })
    })
})


// This suite test for the Book Validations
describe('Book Validation Rules',function(){
        
    describe('Joi and POST Method Validation',function(){
    
         //ISSUEEEEE_____check this code is creating real entries in the database 

        it('should validate the correct entry of the book',function(){
            
            let request = Object.assign({},requestDefaults)
            return server.injectThen(request).then(function(response){
                expect(response.statusCode).to.deep.equal(201)
                
            }).catch(error=> {throw error})
        })
    // /////////////////////////////////////////

        it('should invalidate the incorrect entry of the book',function(){

            let request = Object.assign({},requestDefaults,{
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
                    "date": "123-21-2012",
                    "publisher": "amarjot"
                }
                }
            })
            
            return server.injectThen(request).then(function(response){
                expect(response.statusCode).to.deep.equal(400)
                
            }).catch(error=> {throw error})
        })
    })
    
    describe('GET requests',function(){
        it('should get all the entries of the books',function(){
                    
            return server.injectThen({
                    method:'GET',
                    url:'/books'
                })
                .then(function(response){
                    expect(response.statusCode).to.deep.equal(200)
                    .and.to.be.not.null
                }).catch(error=> {throw error})
        })

        it('should get a particular book',function(){
            
            return server.injectThen({
                method:'GET',
                url:'/books/123'
            })
            .then(function(response){
                expect(response.statusCode).to.deep.equal(200)
                .and.to.be.not.null
            }).catch(error=> {throw error})
        })
        it('should query book based on genre',function(){
            
           let request = {
            method:'GET',
            url:'/books/?author=amarjot'   
            }
            return server.injectThen(request).then(function(response){
                expect(response.statusCode).to.deep.equal(200)
                
            }).catch(error=> {throw error})
        })
    })

    describe('UPDATE/PUT requests',function(){
        it('should update a particular book based on ISBN',function(){
            let request = {
                
                    method:'PUT',
                    url:'/books',
                    payload:{
                        title:'book that contain pizza',
                        author:'josephs',
                        genre:'pizza',
                        isbn:'213',
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

            return server.injectThen(request)
            .then(function(response){
                expect(response.statusCode).to.deep.equal(200)
                .and.to.be.not.null
            }).catch(error =>{throw error})
        })
    })

    describe('DELETE requests',function(){
        it('should delete a particular book',function(){
            
            return server.injectThen({
                method:'DELETE',
                url:'/books/123'
            })
            .then(function(response){
                expect(response.statusCode).to.deep.equal(200)
                .and.to.be.not.null
            }).catch(error=> {throw error})
        })

    })
        
})

// This suite test for the user validations
describe('User Validation Rules',function(){
    describe('GET requests',function(){
        it('should get all the users',function(){
            let request ={
                method:'GET',
                url:'/users'
            } 
            return server.injectThen(request)
            .then(function(response){
                expect(response.statusCode).to.deep.equal(200)
                .and.to.be.not.null
            })
        })
        it('should get all the users queried by email address',function(){
            let request ={
                method:'GET',
                url:'/users/amarjotsingh90@yahoo.com'
            } 
            return server.injectThen(request)
            .then(function(response){
                expect(response.statusCode).to.deep.equal(200)
                .and.to.be.not.null
            })
        })
    })
    describe('POST requests',function(){
        it('Should successfuly post a user after validation',function(){
            let request ={
                method:'POST',
                url:'/users',
                payload:{
                    "booksBorrowed": [
                        {
                            "borrowed": "javascript",
                            "dueDate": "2013-12-13T08:00:00.000Z"
                        }
                    ],
                    "booksReserved": "node8",
                    "email": "rakesh@yahoo.com",
                    "lateFee": 600,
                    "name": "Rakesh"
                }
            } 
            return server.injectThen(request)
            .then(function(response){
                expect(response.statusCode).to.deep.equal(200)
                .and.to.be.not.null
            })
        })
    })
    describe('UPDATE requests',function(){
        it('should update a user after successful validation',function(){
            let request ={
                method:'PUT',
                url:'/users',
                payload:{
                    "booksBorrowed": [
                        {
                            "borrowed": "javascript",
                            "dueDate": "2013-12-13T08:00:00.000Z"
                        }
                    ],
                    "booksReserved": "node8",
                    "email": "rakesh@yahoo.com",
                    "lateFee": 1000,
                    "name": "Rakesh"
                }
            } 
            return server.injectThen(request)
            .then(function(response){
                expect(response.statusCode).to.deep.equal(200)
                .and.to.be.not.null
            })
        })
    })
    describe('DELETE requests',function(){
        it('should delete a user',function(){
            let request ={
                method:'DELETE',
                url:'/users/rakesh@yahoo.com'
            } 
            return server.injectThen(request)
            .then(function(response){
                expect(response.statusCode).to.deep.equal(200)
                .and.to.be.not.null
            })
        })
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