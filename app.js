const express = require('express')
const mongoose = require('mongoose')
const port = 3000


const app = express()
app.use(express.static('public'))
app.set('view engine','ejs')

const dbURI = "###############"
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then((result)=>app.listan(port))
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