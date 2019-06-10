const request = require('request')

const geocode = (address, callback) => {
<<<<<<< HEAD
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
=======

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
>>>>>>> c7afb99eee7c4aadfeea64f53d4e4b9eb22a771b
            })
        }
    })
}

module.exports = geocode