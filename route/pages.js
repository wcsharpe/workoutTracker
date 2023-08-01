//where all ejs routing is happening
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// required models
const Contact = require('./models/contact');
const Users = require('./models/users');
const RandomWorkout = require('./models/randomWorkout');

// for notifing user of incorrect login info
const notifier = require('node-notifier');

// get home page
router.get('/', (req,res)=>{
  res.render('index', {title: 'index'});
});

// get workoutlog page 
router.get('/workoutLog', async (req,res)=>{
  try {
    res.render('workoutLog', {title: 'workoutLog'});
  } catch (error) {
    console.log(error);
  }
});

// add a workout to history
router.post('/addWorkout', async (req,res)=>{
  try{
    // filter to be used in findOne
    const filter = {email: req.body.email};
    // set user to query
    var user = await Users.collection.findOne(filter);
    // function to calculate the calories burned
    function caloriesBurned() {
      
      var weight = parseInt(user.weight);
      var workoutType = req.body.tracker_workout_type;
      var workoutIntensity = req.body.tracker_intensity;
      var duration = parseInt(req.body.tracker_duration);

      switch(workoutIntensity){
        case 'light':
          intensityScore = 1;
          break;
        case 'moderate':
          intensityScore = 1.20;
          break;
        case 'heavy':
          intensityScore = 1.50;
          break;
      }
      switch(workoutType){
        case 'walking':
          workoutScore = 2;
          break;
        case 'jogging':
          workoutScore = 5;
          break;
        case 'hiking':
          workoutScore = 3.5;
          break;
        case 'running':
          workoutScore = 8;
          break;
        case 'swimming':
          workoutScore = 5;
          break;
        case 'cycling':
          workoutScore = 4;
          break;
        case 'weights':
          workoutScore = 4;
          break;
        case 'calisthenics':
          workoutScore = 5;
          break;
        case 'crossfit':
          workoutScore = 5;
          break;
        case 'yoga':
          workoutScore = 2.5;
          break;
        case 'pilates':
          workoutScore = 3;
          break;
      }

      var calsBurned = weight * workoutScore * intensityScore * (duration/60)/2.2 
      return parseInt(calsBurned);
    }
    // call function and set result
    let cals = caloriesBurned();
    // add new info for workout
    // console.log(req.body.tracker_date);
    
    // used to create the unique ids for each workout
    const newWorkoutId = new mongoose.Types.ObjectId();

    await Users.collection.findOneAndUpdate(filter,{ $push:{
      'workouts': {
        _id: newWorkoutId,
        tracker_date: req.body.tracker_date,
        tracker_workout_type: req.body.tracker_workout_type,
        tracker_duration: parseInt(req.body.tracker_duration),
        tracker_intensity: req.body.tracker_intensity,
        tracker_cal: cals
      }
    }}, {new:true}
  );
    // get user again and send updated user along with returning to updated workoutLog page
    user = await Users.collection.findOne(filter);
    res.render('workoutLog', {title: 'workoutLog',user});
  } catch(error) {
    console.log(error);
  }
});

// // delete a workout
// router.get('/deleteWorkout', async (req, res) => {
//   try {
//     const filter = { email: req.query.email };
//     const workoutIndexToDelete = parseInt(req.query.index); // Get the index from the query parameter

//     var user = await Users.findOne(filter).lean();


//     // Ensure the user and workouts array exist and the index is valid
//     if (user && user.workouts && workoutIndexToDelete >= 0 && workoutIndexToDelete < user.workouts.length) {
//       // Remove the workout at the specified index using the splice method
//       user.workouts.splice(workoutIndexToDelete, 1);

//       // Update the workouts array in the database
//       await Users.findOneAndUpdate(filter, { workouts: user.workouts }, { new: true });
//     } else {
//       console.log('Invalid workout index.');
//     }

//     // Get the updated user and render the workoutLog page with the updated user
//     const updatedUser = await Users.findOne(filter).lean(); // Use lean() for the updated user object
//     res.render('workoutLog', {
//       title: 'workoutLog',
//       user: {
//         ...updatedUser,
//         workouts: updatedUser.workouts.map((workout) => ({
//           ...workout,
//           // tracker_date: workout.tracker_date.toLocaleDateString(), // Format the date here
//           tracker_date: workout.tracker_date, // Format the date here

//         })),
//       },
//     });

//     user = await Users.findOne(filter).lean();
//     res.render('workoutLog', { title: 'workoutLog', user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// delete a workout
router.get('/deleteWorkout', async (req, res) => {
  try {
    const email = req.query.email;
    const workoutIdToDelete = req.query.workoutId;

    // console.log('Delete Workout Request Received:');
    // console.log('Email:', email);
    // console.log('Workout ID to Delete:', workoutIdToDelete);

    // Ensure you have proper validation and security measures here if needed

    const filter = { email: email };

    // const result = await Users.findOneAndUpdate(
    //   filter,
    //   { $pull: { workouts: { _id: workoutIdToDelete } } },
    //   { new: true }
    // );


    await Users.findOneAndUpdate(
      filter,
      { $pull: { workouts: { _id: workoutIdToDelete } } },
      { new: true }
    );

    const user = await Users.collection.findOne(filter);

    res.render('workoutLog', { title: 'workoutLog', user });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});



// change user weight
router.post('/adjustWeight', async (req,res) =>{
  try {
    const filter = {email: req.body.email};
    const update = {weight: parseInt(req.body.weight)};
    await Users.collection.findOneAndUpdate(filter,{$set:update},{new:true});
    const user = await Users.collection.findOne(filter);
    res.render('workoutLog',{title: 'workoutLog', user});  
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});



// get contact page
router.get('/contact', (req,res)=>{
  res.render('contact', {title: 'contact'});
});

// get random workout page with a different workout each time loads
router.get('/randomWorkout', async (req,res)=>{
  try {
    var max = 7; 
    var min = 1;
    var randNum = Math.floor(Math.random() * (max - min + 1) + min);
    const randomWorkout = await RandomWorkout.collection.findOne({idNum: randNum});
    res.render('randomWorkout', {title: 'randomWorkout', randomWorkout});
  } catch (error) {
    console.log(error);
  }
});

// registration page
router.get('/register', (req,res)=>{
  res.render('register', {title: 'register'});
});

// post contact info to database
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

// create a new user and store in database
router.post('/createUsers',(req,res)=>{
  const user = new Users({
    email: req.body.email,
    password: req.body.password,
    weight: req.body.weight
  });
  Users.collection.insertOne(user)
  .then(result =>{
    res.render('workoutLog',{title: 'workoutLog',user});  /////////////
  })
  .catch(err => console.log(err));
});

// login process
router.post('/loginUser', async (req,res)=>{
  try {
      // check if the user exists
      const user = await Users.collection.findOne({ email: req.body.email });
      if (user) {
        //check if password matches
        const result = req.body.password === user.password;
        if (result) {
          res.render('workoutLog',{title: 'workoutLog',user});  
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