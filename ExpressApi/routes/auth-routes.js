const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const UserModel = require('../models/user-model');


const router = express.Router();

router.post('/api/signup', ensureLoggedOut(), (req, res, next) => {
    if (!req.body.signupEmail || !req.body.signupPassword) {
        // 400 for client errors (user needs to fix something)
        res.status(400).json({ message: 'Both email and password are required.' });
        return;
    }

    UserModel.findOne(
      { email: req.body.signupEmail },
      (err, userFromDb) => {
          if (err) {
            // 500 for server errors (nothing user can do)
            res.status(500).json({ message: 'Sorry, something went wrong.' });
            return;
          }

          if (userFromDb) {
            // 400 for client errors (user needs to fix something)
            res.status(400).json({ message: 'Sorry this email already exists...please use another one.' });
            return;
          }

          const salt = bcrypt.genSaltSync(10);
          const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

          const theUser = new UserModel({
            fullName: req.body.signupFullName,
            email: req.body.signupEmail,
            encryptedPassword: scrambledPassword,
            picture: req.body.signupPicture,
            weight: req.body.signupWeight,
            height: req.body.signupHeight
          });

          // if (req.file) {
          //   theUser.thumbnail = '/uploads' + req.file.filename)
          // }

          theUser.save((err) => {
              if (err) {
                res.status(500).json({ message: 'User save went to 💩' });
                return;
              }

              // Automatically logs them in after the sign up
              // (req.login() is defined by passport)
              req.login(theUser, (err) => {
                  if (err) {
                    res.status(500).json({ message: 'Login went...' });
                    return;
                  }

                  // Clear the encryptedPassword before sending
                  // (not from the database, just from the object)
                  theUser.encryptedPassword = undefined;

                  // Send the user's information to the frontend
                  res.status(200).json(theUser);
              }); // close req.login()
          }); // close theUser.save()
      }
    ); // close UserModel.findOne()
}); // close router.post('/signup', ...

router.post('/api/login',  (req, res, next) =>{
  const authenticateFunction =
    passport.authenticate('local', (err, theUser, extraInfo) =>{
      if (err) {
        res.status(500).json({ message: 'Sorry, an error has occurred '});
        return;
      }
      //Login failed for sure if "theUser" is empty
      if(!theUser) {
        res.status(401).json(extraInfo);
        return;
      }
      //Login successful, save them in the session.
      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({message: 'Session save error 💩'});
          return;
        }
        // Clear the encryptedPassword before sending
        // (not from the database, just from the object)
        theUser.encryptedPassword = undefined;
        // Everything worked! Send the user's information to the client.
        console.log("End of login route show the user: " + theUser);
        res.status(200).json(theUser);
      });
    });
    authenticateFunction(req, res, next);
});

router.post('/api/logout', ensureLoggedIn(), (req, res, next) => {
  req.logout();
  res.status(200).json({message: 'You have been logged out successfully.'})
  return;
})

router.get('/api/checklogin', (req, res, next) => {
  if(!req.user) {
    res.status(401).json({message: 'There is no one logged in.'});
    return;
  }
  //Clear the encryptedPasswordbefore sending
  //(not from the database, just from the object)
  req.user.encryptedPassword = undefined;
  res.status(200).json(req.user);
});












module.exports = router;
