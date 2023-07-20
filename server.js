const express = require('express');
// const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./route/pages'); // how pages will interact with each other
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// require('dotenv').config()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))
app.use('/', route);

mongoose.connect('mongodb+srv://willcsharpe:mdNmPUeYCq1GrddO@cluster0.enrfnwi.mongodb.net/workoutTracker', {useNewURLParser: true, useUnifiedTopology: true})
.then(()=> {
  app.listen(port, () =>{
    console.log(`Server is running on ${port}`)
  });
})


//willcsharpe
//mdNmPUeYCq1GrddO