const jwt = require('jsonwebtoken')

// Generate JWT Access Token with user id
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30m', 
    })
}

module.exports = generateToken