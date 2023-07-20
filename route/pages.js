//where all ejs routing is happening
const express = require('express');
const router = express.Router();
const Contact = require('./models/contact');
const Users = require('./models/users');

router.get('/', (req,res)=>{
  res.render('index', {title: 'index'});
});


router.get('/contact', (req,res)=>{
  res.render('contact', {title: 'contact'});
});

router.get('/randomWorkout', (req,res)=>{
  res.render('randomWorkout', {title: 'randomWorkout'});
});

router.get('/register', (req,res)=>{
  res.render('register', {title: 'register'});
});

router.post('/submitContact',(req,res)=>{
  const contact = new Contact({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    comment: req.body.comment,
    urgency: req.body.urgency
  });
  Contact.collection.insertOne(contact)
  .then(result =>{
    res.render('contact',{title: 'contact'});
  })
  .catch(err => console.log(err));
});

router.post('/createUser',(req,res)=>{
  const users = new Users({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    weight: req.body.weight,
    height: req.body.height
  });
  Users.collection.insertOne(users)
  .then(result =>{
    res.render('workoutLog',{title: 'workoutLog'});
  })
  .catch(err => console.log(err));
});

module.exports = router;