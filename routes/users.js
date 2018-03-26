const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const UserModel = require('../models/user-model');


router.get('/api/profile', ensureLoggedIn('/login'), (req, res, next) => {
  User.find({_id: req.user._id}, (err, user) => {
    if (err) { return next(err) }
  })//end of .find
  .populate('workouts', {encryptedPassword : 0 }) //if this does not work try singular 'workout'
  .populate('excercises', {encryptedPassword: 0}) //if this does not work try singular 'excercise'
  .exec((err, theUser) => {
    if (err) {
      res.status(500).json({message: 'Could not find the recipe.'});
      return;
    }
    res.status(200).json(theUser);
  }) //end of .exec
}) //end of router.get






module.exports = router;
