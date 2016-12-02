'use strict'

const envConfig = process.env.NODE_ENV || 'dev'
const path = require('path')
const https = require('https')
const config = require(path.join('../../config/enviroments', `${envConfig}.js`))

function async(callback) {
  return new Promise(callback)
}

function handleServerResponse(res, resolve, reject) {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('error', (error)=> reject(error.message))
    res.on('data', (chunk) => rawData += chunk); 
    res.on('end', () => {
      try {
        let parseResponse = JSON.parse(rawData);
        resolve(parseResponse.services)
      } catch (error) {
        reject(error.message)
      }
    })    
}

function requestDepartures() {
  return async((resolve, reject) => {
    https.get(config.endpoints.trains, (res) => {
      handleServerResponse(res, resolve, reject)
    })
  })
}

module.exports = {handleServerResponse, requestDepartures}
