const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

console.log(address)

geocode(address, (error, {
    latitude,
    longitude
}) => {

    if (error) {
        console.log(error)
    } else {
        forecast(latitude, longitude, (error, forecast) => {

            if (error) {
                console.log(error)
            } else {
                console.log(forecast)
            }
        })
    }
})