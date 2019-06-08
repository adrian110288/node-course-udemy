const request = require('request')

const geocode = (address, callback) => {

    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWRyaWFuMTEwMjg4IiwiYSI6ImNqd243NmdpdjA0OHc0M242YWlidmR1aWgifQ.vOEZy1bO0IfGtLCHO-yzbA`

    request({
        url: geocodingUrl,
        json: true
    }, (error, response) => {

        if (error) {
            callback('Unable to connect to location services!')
        } else if (response.body.features.length == 0) {
            callback('Unable to find location at that address!')
        } else {
            const loc = response.body.features[0].center
            callback(undefined, {
                latitude: loc[0],
                longitude: loc[1]
            })
        }
    })
}

module.exports = geocode