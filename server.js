
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dbConnect = require('./config/db/dbConnect')
const { errorHandler, notFound } = require('./middlewares/Error/errorHandler')
const userRoute = require('./route/users/usersRoute')
const adminRoute = require('./route/admin/adminRoute')
const postRoute = require('./route/posts/postRoute')

const app = express()

//CONNECT DATABASE
dbConnect()

app.use(morgan('dev'))

//PARSE DATA
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//cors
app.use(
    cors({
        origin: ["http://localhost:3000"],
        // method: ["GET", "POST","PUT"],
        credentials: true,
    })
);

//CONNECT ROUTES
app.use('/api/users', userRoute )
app.use('/api/admin', adminRoute)
app.use('/api/posts', postRoute)


//ERROR HANDLER
app.use(notFound)
app.use(errorHandler)


//Server configuration 
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server running on port ${PORT}`))




