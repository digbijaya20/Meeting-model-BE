require('dotenv').config()
const mongoose = require('mongoose')
const db = process.env.URL

const ConnectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    })
    console.log('Connected to MongoDB successfuly...')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = ConnectDB