const Controller = require('./controller')
const helpers = require('./helpers.js')
const express = require('express');
const router = express.Router({ mergeParams:true });
const apicache = require('apicache')
apicache.options({debug:true, enabled:true})
const cache = apicache.middleware
const cacheSuccesses = cache('5 minutes', (req)=> req.statusCode === 200)

module.exports = new Controller({helpers, router, cacheSuccesses})