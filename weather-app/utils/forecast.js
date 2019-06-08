const request = require('request')

const forecast = (latitude, longitude, callback) => {

const url = `https://api.darksky.net/forecast/3a246c5b28a535bb1019e7f541e5b05b/${longitude},${latitude}?units=si`

request({
    url: url,
    json: true}, (error, response) => {

        if(error) {
            console.log('Unable to connect to server!')
        } else {
            callback(undefined, response.body.currently.temperature)
        }
    })
}

module.exports = forecast