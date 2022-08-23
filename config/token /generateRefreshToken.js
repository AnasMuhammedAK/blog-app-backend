const jwt = require('jsonwebtoken')


// Generate JWT Refresh Token with user id
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: '30d',
    })
}
module.exports = generateRefreshToken