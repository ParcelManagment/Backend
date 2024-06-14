const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const port = 3000


const app = express()

app.use(express.static('public'))
app.set('view engine','ejs')

const dbURI = `mongodb+srv://kavi2020wick:${process.env.PASSWORD}@cluster0.kh6gmvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
console.log(dbURI);
//mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
mongoose.connect(dbURI)
.then((result)=>console.log("Database connetion success"))
.catch((err)=>console.log(err));


app.get('/', (req, res) => {
  res.send('entry point')
})
app.get('/login', (req, res) => {
  res.send('This is login')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})