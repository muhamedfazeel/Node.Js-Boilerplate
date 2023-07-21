const { logger } = require('./logger');

module.exports.logRequest = (req, res, next) => {
    const { method, originalUrl, headers, cookies, body, query, params } = req;

    logger.info(`
    ----------------------- Request received -----------------------
    Method: ${method}
    URL: ${originalUrl}
    Headers: ${JSON.stringify(headers, {}, 2)}
    Cookies: ${JSON.stringify(cookies, {}, 2)}
    Body: ${JSON.stringify(body, null, 2)}
    Query Parameters: ${JSON.stringify(query, null, 2)}
    Request Parameters: ${JSON.stringify(params, null, 2)}
    ------------------------ End of Request ------------------------
`);
    next();
};

module.exports.logResponse = (req, res, next) => {
    const originalSend = res.send;

    // Override the res.send method to capture the response data
    res.send = function (body) {
        const statusCode = res.statusCode;
        const { method, originalUrl } = req;
        const responseBody =
            body instanceof Object ? JSON.stringify(body, null, 2) : body;

        logger.info(`
      ----------------------- Response sent -----------------------
      Status: ${statusCode} 
      Method: ${method}
      URL: ${originalUrl}
      Response: ${responseBody}
      ----------------------- End of Response ---------------------
    `);

        // Call the original res.send method to send the response
        originalSend.call(res, body);
    };

    next();
};
