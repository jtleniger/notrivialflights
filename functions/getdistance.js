const https = require('https');
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

const fetch = async function(url) {
    if (!url || typeof(url) !== 'string') {
        throw 'URL must be a string.'
    }

    return new Promise(function(resolve, reject) {
        https.get(url, (res) => {
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
                
                reject(error);
            }
    
            res.setEncoding('utf8');
    
            let rawData = '';
    
            res.on('data', (chunk) => { rawData += chunk; });
    
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    
                    resolve(parsedData);
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
}

/**
 * EXPORTED FUNCTION
 */
exports.handler = async function(event, context, callback) {
    const baseUrl = 'https://api.opencagedata.com/geocode/v1/json?';

    let fromRes, toRes = null;

    const { from, to } = event.queryStringParameters;

    if (!from || !to) {
        callback(new Error('Missing one or more parameters.'), {
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
        const keyParam = ['key', key];

        const p1 = new URLSearchParams([
            keyParam,
            ['q', from]
        ]);

        const p2 = new URLSearchParams([
            keyParam,
            ['q', to]
        ]);

        fromRes = await fetch(`${baseUrl}${p1.toString()}`);
        toRes = await fetch(`${baseUrl}${p2.toString()}`);
        
    } catch (e) {
        callback(new Error(`Error calling opencage: from=${from}, to=${to}`), {
            statusCode: 400
        });

        return;
    }

    const geo1 = fromRes.results[0].geometry;
    const geo2 = toRes.results[0].geometry;

    const result = distance(geo1.lat, geo1.lng, geo2.lat, geo2.lng);

    callback(null, JSON.stringify({
        statusCode: 200,
        body: result
    }));
};