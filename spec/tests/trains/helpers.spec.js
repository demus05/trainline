'use strict'
const path = require('path')
const {filterDepartures} = require(path.join(__dirname, '../../../modules/trains/helpers'))

describe("Helper", ()=> {
    var data;
    beforeEach(()=>{
        data = [{
            "transportMode":"TRAIN",
                "scheduledInfo":{
                "scheduledTime":"2016-12-01T18:51:00+00:00"
                }
            }, {
            "transportMode":"TRAIN",
            "scheduledInfo":{
                "scheduledTime":"2016-12-01T18:41:00+00:00"
            }
        },{
            "transportMode":"BUS",
            "scheduledInfo":{
                "scheduledTime":"2016-12-01T18:42:00+00:00"
            }
        }]
    })
    
    it("Should filter response by TRAINS only", ()=>{
        expect(filterDepartures(data, []).length).toEqual(2)
    })

    it("Should return an empty array if empty resonse", ()=>{
        expect(filterDepartures([], []).length).toEqual(0)
    })

    it("Should sort by decending time", ()=>{
        expect(filterDepartures(data, [])[0]).toEqual({
            "transportMode":"TRAIN",
            "scheduledInfo":{
                "scheduledTime":"2016-12-01T18:41:00+00:00"
            }
        })
    })
})