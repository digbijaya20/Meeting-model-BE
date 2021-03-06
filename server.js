const express = require('express')
const app = express()

const connectDB = require('./config/db')
// connect to database

connectDB()

app.use(express.json({extended: true}))

app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/meetings', require('./routes/meetings'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`ohh yeah Server started at port ${PORT}`))