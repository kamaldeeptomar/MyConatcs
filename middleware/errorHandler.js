const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    if (res.headersSent) {
        return next(err); // If headers are already sent, pass the error to the default error handler
    }

    switch (statusCode) {
        case 400:
            res.status(400).json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case 404:
            res.status(404).json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default:
            res.status(statusCode).json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
    }
};

module.exports = errorHandler;
