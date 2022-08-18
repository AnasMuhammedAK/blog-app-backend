const mongoose = require('mongoose')

const validateMongodbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id) 
    if (!isValid){
        throw new Error(`Invalid User ID: ${id} , status(401)`)
    } 
}
module.exports = validateMongodbId