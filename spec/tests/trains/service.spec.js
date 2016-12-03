'use strict'
const path = require('path')
const service = require(path.join(__dirname, '../../../modules/trains/service.js'))
const EventEmitter = require("events").EventEmitter
const https = require('https')
const sinon = require('sinon')

describe("TrainService", ()=> {
  var handleServerResponse, resMock
  beforeEach(()=> {
      resMock = new EventEmitter()
      resMock.setEncoding = function() {}
  })
  describe("#requestDepartures", ()=> {
    var httpsSpy, handleServerResponseSpy;
    beforeEach(()=>{
      httpsSpy = spyOn(https, 'get').andCallThrough()
      handleServerResponseSpy = spyOn(service, 'handleServerResponse')
    })
    it("Expect the right endpoint to be called", ()=> {
      service.requestDepartures()
      expect(httpsSpy.mostRecentCall.args[0]).toEqual('https://realtime.thetrainline.com/departures/wat')
    })
  })

  describe("#handleServerResponse", ()=> {
    it("Should handle service errors", (done)=> {
        handleServerResponse = service.handleServerResponse(resMock,()=>{},()=>done())
        resMock.emit("error",{ message:"service error"})
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
})
