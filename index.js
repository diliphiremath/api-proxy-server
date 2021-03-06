const express = require('express')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const errorHandler = require('./middleware/error')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

// Rate limiter
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 30
})
app.use(limiter)
app.set('trust proxy', 1)

// Set static folder
app.use(express.static('public'))

// Routes
app.use('/api', require('./routes'))

// Enable cors
app.use(cors())

// Error handler middleware
app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
