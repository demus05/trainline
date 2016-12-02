'use strict'

const {requestDepartures} = require('./service.js')

function async(callback) {
  return new Promise(callback)
}

function filterDepartures(list=[], filters) {
  /*
  * Create a middlware filters when required.
  */
  const transportMode = "TRAIN"
  
  return list.filter((item) => {
    return item.transportMode === transportMode
  })
  .sort((a,b)=> { 
    return new Date(a.scheduledInfo.scheduledTime).getTime() - new Date(b.scheduledInfo.scheduledTime).getTime();
  })
}

function getDepartures(stationCode, filters) {
  return async( (resolve, reject) => {
    requestDepartures()
      .then((data) => resolve(filterDepartures(data, filters)))
      .catch((error) => reject(error))
  })
}

module.exports = {getDepartures, filterDepartures}