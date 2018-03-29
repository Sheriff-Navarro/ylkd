const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const WorkoutModel = require('../models/workout-model');
const ExcerciseModel = require('../models/excercise-model');
const authorizeBill = require('../middleware/authorize-bill');
const router = express.Router();

router.post('/api/workout/new', (req, res, next) => {
if(!req.user) {
    res.status(401).json({message: 'Log in to create a workout.'})
    return;
  }
const theWorkout = new WorkoutModel({
  name: req.body.workoutName,
  duration: req.body.workoutDuration,
  privateWorkout: req.body.workoutPrivacy,
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
    if (err && theWorkout.errors) {
      res.status(400).json({
        nameError: theWorkout.errors.name,
        durationError: theWorkout.errors.duration,
        privateWorkout: theWorkout.errors.privateWorkout
      });
      return;
    }
    //save the workout back to the user
    req.user.workouts.push(theWorkout._id);
    //Put the full user info here for Angular
    req.user.encryptedPassword = undefined;
    theWorkout.user = req.user;
    //Success
    res.status(200).json(theWorkout)
  }) //close the Bill.Save()
})//close the post route

router.post('/api/workout/:workoutId/addexcercise/:excerciseId', (req, res, next) => {
  const workoutId = req.params.workoutId
  const excerciseId = req.params.excerciseId

  WorkoutModel.findById(workoutId, (err, theWorkout) => {
        if (err) {
          res.json(err);
          return;
        }
  ExcerciseModel.findById(excerciseId, (err, theExcercise)=>{
      if (err) {
        res.json(err);
        return;
      }
      if(theExcercise) {
      theWorkout.excercises.push(theExcercise)
      theWorkout.save((err)=>{
        if (err) {
            res.json(err);
            return;
          }
        });
      theExcercise.save((err)=>{
          if (err) {
              res.json(err);
              return;
            }
          const data = {
              workout: theWorkout,
              excercise: theExcercise
          }
          res.json(data)
          });
        }
      });
    });
  });

  router.post('/api/workout/:workoutId/excercise/:excerciseId/addround', (req, res, next) => {
    const workoutId = req.params.workoutId
    const excerciseId = req.params.excerciseId

    WorkoutModel.findById(workoutId, (err, theWorkout) => {
          if (err) {
            res.json(err);
            return;
          }
    ExcerciseModel.findById(excerciseId, (err, theExcercise)=>{
        if (err) {
          res.json(err);
          return;
        }
        if(theExcercise) {
        const round = {
          weight: theExcercise.weight,
          reps: theExcercise.reps
        }
        console.log("Round: " + round);
        theExcercise.history.push(round)
        theWorkout.save((err)=>{
          if (err) {
              res.json(err);
              return;
            }
          });
        theExcercise.save((err)=>{
            if (err) {
                res.json(err);
                return;
              }
            const data = {
                workout: theWorkout,
                excercise: theExcercise
            }
            res.json(data)
            });
          }
        });
      });
    });

router.post('/api/workout/:id/delete', (req, res, next) => {
  //Assign billId to the params.id so mongoose can find the bill and delete it from the DB.
  const workoutId = req.params.id;
  //Delete post method
  WorkoutModel.findByIdAndRemove(workoutId, (err, workout) => {
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
    privateExcercise: req.body.workoutPrivacy
  };
    WorkoutModel.findByIdAndUpdate(workoutId, updates, (err, workout) => {
      if (err) {return next(err);}
      return res.status(200).json({
        message: 'The workout information has been updated.'
      });
    });
});

router.get('/api/workout/all', (req, res, next) => {
  WorkoutModel.find()
  .populate('user', { encryptedPassword : 0})
  .exec((err, allTheWorkouts)=>{
    if (err) {
      res.status(500).json({message: 'Could not retrieve all workouts.'})
      return;
    }
    res.status(200).json(allTheWorkouts);
  })
})

router.get('/api/workout/:id', (req, res, next) => {
  const workoutId = req.params.id
  WorkoutModel.findById(workoutId, (err, theWorkout)=>{
    if (err) { return next(err) }
  })
  .populate('user', { encryptedPassword : 0})
  .populate('excercises', {encryptedPassword: 0})
  .exec((err, theWorkout)=>{
    if (err) {
      res.status(500).json({message: 'Could not retrieve the workout.'})
      return;
    }
    res.status(200).json(theWorkout);
  })
})

//TO DO: ADD AUTHORIZE BILL AND AUTHORIZE Excercise
//TO DO: ADD ENSURELOGGEDIN FOR ALL ROUTES
module.exports = router;
