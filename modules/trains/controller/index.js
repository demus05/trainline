'use strict'

class TrainDepatures {
    constructor(options) {
       this.router = options.router;
       this.helpers = options.helpers;
       this.cacheSuccesses = options.cacheSuccesses;
    }

    invalidParams(stationCode = '') {
        return !stationCode.match(/^[A-Za-z]{2,4}$/)
    }

    getDepartures(req, res, next) {
        let {stationCode} = req.params 
        
        if(this.invalidParams(stationCode))
            return res.status(400)
                .send({error:`Invalid station code: ${stationCode}`})
        
        this.helpers
            .getDepartures()
                .then((data) => res.json(data))
                .catch((error) => res.sendStatus(503))
    }

    routes() {
        let cache = this.cacheSuccesses;
        return(
            this.router

            .use(cache)
            
            /**
            * @api {get} /departures/trains/:stationCode live departure by stationCode
            * @apiDescription View live departure information
            */
            .get('/departures/trains/:stationCode', this.getDepartures.bind(this))

            /**
            * @api {get} /departuresss/trains/:stationCode live departure by stationCode
            * @apiDescription View live departure information
            */
            .get('/departures1/trains/:stationCode', this.getDepartures.bind(this))
        )
    }
}

module.exports = TrainDepatures