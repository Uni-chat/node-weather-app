const request = require('request')

const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibGVvbmFyZDAwNyIsImEiOiJjazlwbDhmdHcwOHlzM2ltb3U0OWtlcW1vIn0.DVHOvjNo3OEVzayO7Ab1vg'
    request({url, json: true}, (error, { body }) => {

        if (error) {

            callback('No network found!', undefined)

        } else if (body.features.length === 0) {

            callback('No matching results found! search again.', undefined)

        } else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }

    })
}
 module.exports = geoCode