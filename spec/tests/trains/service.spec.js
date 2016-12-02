'use strict'
const path = require('path')
const service = require(path.join(__dirname, '../../../modules/trains/service.js'))
const EventEmitter = require("events").EventEmitter;

describe("#handleServerResponse", ()=> {
    var handleServerResponse, resMock
    beforeEach(()=> {
        resMock = new EventEmitter()
        resMock.setEncoding = function() {}
    })

    it("Should handle service errors", (done)=> {
        handleServerResponse = service.handleServerResponse(resMock,()=>{},()=>done())
        resMock.emit("error",{ message:"service error"});
    })

    it("Should parse JSON respone", (done)=> {
        handleServerResponse = service.handleServerResponse(resMock,(response)=>{
            expect(response.parsed).toEqual(true)
            done()
        },()=>done())
        resMock.emit('data', '{"services":{"parsed":true}}')
        resMock.emit('end')
    })

    it("Should return error if invalid JSON response", (done)=> {
        handleServerResponse = service.handleServerResponse(resMock,(response)=>done(),(error)=>{
            expect(error).toEqual('Unexpected token s in JSON at position 1')
            done()
        })
        resMock.emit('data', '{services":{"parsed":true}}')
        resMock.emit('end')
    })
})