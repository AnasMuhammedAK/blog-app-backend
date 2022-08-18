const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../model/user/User');


const authMiddleware = asyncHandler(async (req, res,next) => {
    let token
    if (req?.headers?.authorization?.startsWith('Bearer')) {  // "?" denotes the "AND "Operator
        try {
            token = req.headers.authorization.split(' ')[1]
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                // Find the user by id
                const user = await User.findById(decoded.id).select('-password')
                // Attach the user to the request object
                req.user = user
                next()
            } else {
                res.status(401)
                throw new Error('There is no token attached to the request object')
            }
        } catch (error) {
            console.log(error)
            throw new Error('Not Authorized or Token Expired, please login again')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = authMiddleware