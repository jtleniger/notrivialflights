const axios = require('./node_modules/axios');
const URLSearchParams = require('url').URLSearchParams;

/**
 * Function to get the "as the crow flies" distance between two cities.
 * 
 * Expects query parameter strings "from" and "to" containing city names.
 * 
 * Returns the distance in km.
 */

/**
 * HELPERS
 */
const distance = function (lat1, lon1, lat2, lon2) {
    if (isNaN(lat1) || isNaN(lat2) || isNaN(lon1) || isNaN(lon2)) {
        return 0;
    }

    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }

    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;

    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;

    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    
    if (dist > 1) {
        dist = 1;
    }

    dist = Math.acos(dist);

    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;

    // Convert to KM.
    dist = dist * 1.609344;

    return dist;
}

/**
 * EXPORTED FUNCTION
 */
exports.handler = function(event, context, callback) {
    const baseUrl = 'https://api.opencagedata.com/geocode/v1/json?';

    const { from, to } = event.queryStringParameters;

    if (!from || !to) {
        callback(new Error('Missing one or more paremeters.'), {
            statusCode: 400
        });

        return;
    }

    const key = process.env.OPENCAGE_KEY;

    if (!key) {
        callback(new Error('No API key available.'), {
            statusCode: 400
        });

        return;
    }

    const p1 = new URLSearchParams();

    p1.append('q', from);
    p1.append('key', key);

    const p2 = new URLSearchParams();

    p2.append('q', to);
    p2.append('key', key);

    axios.all([
        axios.get(`${baseUrl}${p1.toString()}`),
        axios.get(`${baseUrl}${p2.toString()}`)
    ]).then(axios.spread(function (r1, r2) {
        const geo1 = r1.data.results[0].geometry;
        const geo2 = r2.data.results[0].geometry;

        const result = distance(geo1.lat, geo1.lng, geo2.lat, geo2.lng);

        callback(null, {
            statusCode: 200,
            body: {
                distance: result
            }
        });
    }))
    .catch(function (error) {
        callback(new Error(`Error fetching from=${from}, to=${to}, e=${error}`), {
            statusCode: 400
        });
    });
};