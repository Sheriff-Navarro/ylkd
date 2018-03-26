const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const ExcerciseModel = require('../models/excercise-model');
const WorkoutModel = require('../models/workout-model');
const UserModel = require('../models/user-model');
// const authorizeBill = require('../middleware/authorize-bill');
const router = express.Router();

router.post('/api/excercise', (req, res, next) => {
if(!req.user) {
    res.status(401).json({message: 'Log in to create an excercise.'})
    return;
  }
const theExcercise = new ExcerciseModel({
  name: req.body.excerciseName,
  weight: req.body.excerciseWeight,
  reps: req.body.excerciseReps,
  workout: req.body.workout,
  user: req.user._id
  });
//Handle the unknown errors from the database.
theExcercise.save((err) =>{
  if(err && theExcercise.errors === undefined){
      res.status(500).json({
        message: 'Database could not save the excercise.'
      });
      return;
    }
    //Validation error
    if (err && theExcercise.errors) {
      res.status(400).json({
        nameError: theExcercise.errors.name,
        weightError: theExcercise.errors.weight,
        repsError: theExcercise.errors.reps,
        workout: theExcercise.errors.workout,
        user: theExcercise.errors.user
      });
      return;
    }
    //Put the full user info here for Angular, BUT hide their password Bcrypt hash.
    req.user.encryptedPassword = undefined;
    theExcercise.user = req.user;
    //Success
    res.status(200).json(theExcercise)
  }) //close the Bill.Save()
})//close the post route

router.post('/api/excercise/:id/delete', (req, res, next) => {
  const excerciseId = req.params.id;
  ExcerciseModel.findByIdAndRemove(excerciseId, (err, excercise) => {
    if(err){return next(err)}
    return res.status(200).json({message: 'Excercise deleted.'})
  })
})

//Edit Route:
router.post('/api/excercise/:id/edit', (req, res, next) => {
  const excerciseId = req.params.id;
  const updates = {
    name: req.body.excerciseName,
    weight: req.body.excerciseWeight,
    reps: req.body.excerciseReps,
    workout: req.body.workout};
    ExcerciseModel.findByIdAndUpdate(excerciseId, updates, (err, excercise) => {
      if (err) {return next(err);}
      return res.status(200).json({
      message: 'Excercise has been updated.'})
    });
});




module.exports = router;
