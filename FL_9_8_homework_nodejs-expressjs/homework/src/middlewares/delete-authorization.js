module.exports.deleteAuth = () => {
    return (req, res, next) => {
        if (req.method === 'DELETE' && req.headers.authorization !== 'X-Password qwerty') {
            res.status(401).send('Unauthorized');
        } else {
            next();
        }
    }
};