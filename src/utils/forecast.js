const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude +'&lon='+ longitude +'&exclude=hourly,daily&appid=8a90297f538eccbd2205a0407ebcf964&units=metric'
    
    request({url, json: true}, (error, { body }) => {

        if (error) {
            
            callback('No network found!', undefined)

        } else if (body.message) {

            callback('Unable to find locations', undefined)

        } else {

            callback(undefined, 'It is currently: '+ body.current.temp+
            ' degrees out.\nThere is: '+ body.current.clouds +'% chance of rain.\n' 
            +'Sky View: '+ body.current.weather[0].description +'.')
        }
    })

}



module.exports = forecast