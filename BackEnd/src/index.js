require('./models/User')
require('./models/Track')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const reqAuth = require('./middlewares/requireAuth')
const cors = require('cors');
const multer = require('multer')
const path = require('path');
const forms = multer();

const app = express();

const whitelist = ["http://localhost:3001","http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.use(authRoutes);
app.use(employeeRoutes)

app.use(bodyParser.json());

const mongoUri = "mongodb+srv://swapnika:Swap%401998@cluster0.3ypvz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoUri);

mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo instance')
})
mongoose.connection.on('error',(e)=>{
    console.error('Error to mongo instance',e)
})

app.get('/',reqAuth,(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    res.send(`email ${req.user.email}`)
})

app.listen(3000,()=>{
    console.log('connected');
})