const jwt = require('jsonwebtoken');
const  User  = require('../models/user');

require('dotenv').config();

const handleLogin = async (req, res) => {
    const { login, password } = req.body;
    console.log(login)
    if (!login || !password) return res.status(400).json({ 'message': 'Login and password are required.' });
    try {
        // Find the user in the database
        const foundUser = await User.findOne({ login: login } );

        if (!foundUser) return res.sendStatus(401); // Unauthorized
        
        if (password == foundUser.password) {
            // Create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": foundUser._id,
                        "login": foundUser.login,
                        "name": foundUser.name,
                        "profilePictureUrl": foundUser.profilePictureUrl
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            const refreshToken = jwt.sign(
                { "login": foundUser.login },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // Update refreshToken in the database
            await User.updateOne({ _id: foundUser._id }, {$set:{refreshToken: refreshToken}});



            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.error('Error occurred while handling login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { handleLogin };