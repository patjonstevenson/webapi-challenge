function logger(req, res, next) {
    console.log(`[\n${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.ip}\n`);
    next();
};

module.exports = logger;