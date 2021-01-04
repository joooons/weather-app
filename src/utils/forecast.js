const request = require('request');




const forecast = (lat, lon, callback) => {
    // console.log('Input: lat',lat,' lon', lon);
    // console.log('');
    const url = `http://api.weatherstack.com/current?access_key=27de6103ba2e316e9b23f6b11a8c17ff&query=${lat},${lon}&units=f`;
    request( { url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const desc = body.current.weather_descriptions[0];
            const temperature = body.current.temperature;
            const humidity = body.current.humidity;
            const feelslike = body.current.feelslike;
            const text = `${desc}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees. The humidity is ${humidity}%.`;
            callback(undefined, text );
        }
    })
}

module.exports = forecast;