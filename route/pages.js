//where all ejs routing is happening
const express = require('express');
const router = express.Router();
const Contact = require('./models/contact');
const Users = require('./models/users');
const notifier = require('node-notifier');

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

router.post('/createUsers',(req,res)=>{
  const users = new Users({
    email: req.body.email,
    password: req.body.password,
    weight: req.body.weight
  });
  Users.collection.insertOne(users)
  .then(result =>{
    res.render('workoutLog',{title: 'workoutLog'});
  })
  .catch(err => console.log(err));
});

router.post('/loginUser',async (req,res)=>{
  try {
      // check if the user exists
      const user = await Users.collection.findOne({ email: req.body.email });
      if (user) {
        //check if password matches
        const result = req.body.password === user.password;
        if (result) {
          res.render('workoutLog',{title: 'workoutLog'});
        } else {
          // res.status(400).json({ error: "password doesn't match" });
          notifier.notify({
            title: 'Workout Tracker',
            message: 'Invalid password and/or user!',
            sound: true
          });
        }
      } else {
        // res.status(400).json({ error: "User doesn't exist" });
        notifier.notify({
          title: 'Workout Tracker',
          message: 'Invalid password and/or user!',
          sound: true
        });
      }
    } catch (error) {
      res.status(400).json({ error });
      console.log(error);
    }
});

module.exports = router;