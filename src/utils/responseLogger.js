const { logger } = require('./logger');

module.exports = (req, res, next) => {
    const originalSend = res.send;

    // Override the res.send method to capture the response data
    res.send = function (response) {
        const statusCode = res.statusCode;
        const { method, originalUrl, body, query, params } = req;
        const requestBody = JSON.stringify(body, null, 2);
        const queryParameters = JSON.stringify(query, null, 2);
        const requestParameters = JSON.stringify(params, null, 2);
        const responseBody =
            response instanceof Object ? JSON.stringify(response, null, 2) : response;

        logger.info(`
      ----------------------- Response sent -----------------------
      Status: ${statusCode} 
      Method: ${method}
      URL: ${originalUrl}
      Query Parameters: ${queryParameters}
      Request Parameters: ${requestParameters}
      Request Body: ${requestBody}
      Response: ${responseBody}
    ----------------------- End of Response---------------------
        `);

        // Call the original res.send method to send the response
        originalSend.call(res, response);
    };

    next();
};
