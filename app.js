const express = require('express')
const app = express()
const {connectDb, getConnection} = require('./database/database.js')
const users = require('./routes/users.js');
const staff = require('./routes/station_staff.js');
const cookieParser = require('cookie-parser');
const sequelize = require("./database/connectSequelize.js")
const port = 3001

const UnregisteredUser = require('./models/user_nr.js')




connectDb();

app.use(express.json())
app.use(cookieParser())

app.use('/users', users); // user registration and login
app.use('/staff', staff); // staff login and registration



app.get('/', (req, res) => {
  res.send('entry point')
})
app.get('/login', (req, res) => {
  res.send('This is login')
})
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})