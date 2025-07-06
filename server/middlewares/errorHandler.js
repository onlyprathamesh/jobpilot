const errorHandler = (err, req, res, next) => {
    const status = err.status ||  500;
    const message = err.message || "Internal Server Error";
    const details = err.details || null;

    res.status(status).send({success:false, message:message, details:details});
}

module.exports = errorHandler;