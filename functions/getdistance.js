const https = require('https');

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

const fetch = function(url) {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;

    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);

    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }

    if (error) {
        // Consume response data to free up memory
        res.resume();
        
        throw error;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });

    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            
            return parsedData;
        } catch (e) {
            throw e;
        }
    });
}

/**
 * EXPORTED FUNCTION
 */
exports.handler = function(event, context, callback) {
    const baseUrl = 'https://api.opencagedata.com/geocode/v1/json?';

    let fromRes, toRes = null;

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

    try {
        const params = new URLSearchParams();

        params.append('q', from);
        params.append('key', key);

        fromRes = fetch(`${baseUrl}${params.toString()}`);
    } catch (e) {
        callback(new Error(`Error fetching q=${from}, e=${e}`), {
            statusCode: 400
        });

        return;
    }

    try {
        const params = new URLSearchParams();

        params.append('q', to);
        params.append('key', key);

        toRes = fetch(`${baseUrl}${params.toString()}`);
    } catch (e) {
        callback(new Error(`Error fetching q=${to}, e=${e}`), {
            statusCode: 400
        });

        return;
    }

    const geo1 = fromRes.data.results[0].geometry;
    const geo2 = toRes.data.results[0].geometry;

    const result = distance(geo1.lat, geo1.lng, geo2.lat, geo2.lng);

    callback(null, {
        statusCode: 200,
        body: {
            distance: result
        }
    });
};