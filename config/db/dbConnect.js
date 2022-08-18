const mongoose = require('mongoose')
require('dotenv').config()
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB is Connected successfully')
    } catch (error) {
        console.log(`Error ${error.message}`)
    }
}
module.exports = dbConnect