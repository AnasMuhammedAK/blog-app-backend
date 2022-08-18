
const express = require('express')
const morgan = require('morgan')
const dbConnect = require('./config/db/dbConnect')
const { errorHandler, notFound } = require('./middlewares/Error/errorHandler')


const app = express()

//CONNECT DATABASE
dbConnect()

app.use(morgan('dev'))

//PARSE DATA
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//CONNECT ROUTES
app.use('/api/users', require('./route/users/usersRoute'))

//ERROR HANDLER
app.use(notFound)
app.use(errorHandler)


//Server configuration 
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server running on port ${PORT}`))




