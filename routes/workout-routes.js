const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const WorkoutModel = require('../models/workout-model');
const ExcerciseModel = require('../models/excercise-model');
const authorizeBill = require('../middleware/authorize-bill');
const router = express.Router();

router.post('/api/workout', (req, res, next) => {
if(!req.user) {
    res.status(401).json({message: 'Log in to create a workout.'})
    return;
  }
const theWorkout = new WorkoutModel({
  name: req.body.workoutName,
  amount: req.body.duration,
  user: req.user._id
  });
//Handle the unknown errors from the database.
theWorkout.save((err) =>{
  if(err && theWorkout.errors === undefined){
      res.status(500).json({
        message: 'Database could not save the workout'
      });
      return;
    }
    //Validation error
    if (err && theBill.errors) {
      res.status(400).json({
        nameError: theWorkout.errors.name,
        durationError: theWorkout.errors.duration,
      });
      return;
    }
    //Put the full user info here for Angular
    req.user.encryptedPassword = undefined;
    theWorkout.user = req.user;
    //Success
    res.status(200).json(theWorkout)
  }) //close the Bill.Save()
})//close the post route


router.post('/api/workout/:id/delete', (req, res, next) => {
  //Assign billId to the params.id so mongoose can find the bill and delete it from the DB.
  const workoutId = req.params.id;
  //Delete post method
  WorkoutModel.findByIdAndRemove(woworkoutId, (err, workout) => {
    if(err){return next(err)}
    return res.status(200).json({message: 'The Workout has been deleted.'})
  });//BillModel.findByIdAndRemove close
});//Router.post close

//Edit Route:
router.post('/api/workout/:id/edit',  (req, res, next) => {
  const workoutId = req.params.id;
  const updates = {
    name: req.body.workoutName,
    duration: req.body.workoutAmount,
  };
    WorkoutModel.findByIdAndUpdate(workoutId, updates, (err, bill) => {
      if (err) {return next(err);}
      return res.status(200).json({
        message: 'The workout information has been updated.'
      });
    });
});


//TO DO: ADD AUTHORIZE BILL AND AUTHORIZE Excercise
//TO DO: ADD ENSURELOGGEDIN FOR ALL ROUTES












module.exports = router;
