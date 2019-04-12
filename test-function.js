const handler = require('./functions/getdistance').handler;

const event = {
    queryStringParameters: {
        from: "Denver",
        to: "LA"
    }
};

const callback = function(error, response) {
    console.log(error);
    console.log(response);
};

handler(event, null, callback);