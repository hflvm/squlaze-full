const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://localhost:5000/'+address

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else {
            callback(undefined, {
                //UserName:body[0].UserName,
               // Password:body[3].Password
            
            })
        }
    })
}

module.exports = geocode