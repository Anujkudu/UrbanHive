function notFound(req, res, next) {
    res.status(404);
    res.json({ message: 'Route not found' });
}

function errorHandler(err, req, res, next) {
    const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(status).json({
        message: err.message || 'Server error'
    });
}

module.exports = { notFound, errorHandler };
