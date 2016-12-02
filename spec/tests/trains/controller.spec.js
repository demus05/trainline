'use strict'
const path = require('path')
const Controller = require(path.join(__dirname, '../../../modules/trains/controller'))

describe("trainDepatures", ()=>{
    var trainController;
    beforeEach(() => {
        const router = {}
        const cacheSuccesses = {}
        const helpers = {
            router: {},
            getDepartures: function(res) {
                return {
                    then: function(cb) {
                        cb([])
                        return {
                            catch: function(cb) {
                                cb(new Error("Service error"))
                            }
                        }
                    }
                }
            }
        }
        trainController = new Controller({helpers, router, cacheSuccesses})
    })

    describe("#getDepartures",()=> {
        it('it should return a list of train times if successful',(done)=>{
            trainController.getDepartures({params:{stationCode:"ABCD"}}, {
                'json': function(data) {
                    expect(data).toEqual([])
                    done()
                 },
                'sendStatus': function(statusCode) {}
            })
        })

        it('it should respond with service error if service issues',(done)=>{
            trainController.getDepartures({params:{stationCode:"ABCD"}}, {
                'json': function(data) {},
                'sendStatus': function(statusCode) {
                    expect(statusCode).toEqual(503)
                    done()
                }
            })
        })
    })

    describe('#invalidParams When requesting times by station code', ()=>{
        var inValidCodes, validCodes;

        beforeEach(()=>{
            inValidCodes = [' ','!@£$%','AB1234','123432423fds']
            validCodes = ['AB','ABC','ABCD']
        })

        it('Should check for valid station codes', ()=>{
            inValidCodes.map((code)=> {
                expect(trainController.invalidParams(code)).toEqual(true)
            })
            validCodes.map((code)=> {
                expect(!trainController.invalidParams(code)).toEqual(true)
            })
       })
    })
})
