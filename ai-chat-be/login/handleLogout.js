const  User  = require('../models/user');
require('dotenv').config();


const handleLogout = async (req, res) => {
    const refreshToken = req.cookies.jwt || req.cookies.accessToken;
    
    if (!refreshToken) return res.sendStatus(202); // No content

    try {
        // Check if refreshToken exists in the database
        const foundUser = await User.findOne({ refreshToken: refreshToken });
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            res.clearCookie('accessToken', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }

        // Update refreshToken in the database to clear it
        await User.updateOne({ _id: foundUser._id }, { refreshToken: '' });

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.clearCookie('accessToken', { httpOnly: true, sameSite: 'None', secure: true });
        res.sendStatus(204);
    } catch (error) {
        console.error('Error occurred while handling logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { handleLogout };

