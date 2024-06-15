const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return next();
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.login = decoded.UserInfo.login;
            req.id = decoded.UserInfo.id;
            req.name = decoded.UserInfo.name;
            req.profilePictureURL = decoded.UserInfo.profilePictureURL;
            next();
        }
    );
}

module.exports = verifyJWT