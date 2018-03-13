const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const BillModel = require('../models/bill-model');
const UserModel = require('../models/user-model');
const router = express.Router();

router.post('/api/bills', (req, res, next) => {
if(!req.user) {
    res.status(401).json({message: 'Log in to create a bill.'})
    return;
  }
const theBill = new BillModel({
  name: req.body.billName,
  amount: req.body.billAmount,
  dueDate: req.body.billDueDate,
  recurringFrequency: req.body.billRecurringFrequency,
  user: req.user._id
  });
//Handle the unknown errors from the database.
theBill.save((err) =>{
  if(err && theBill.errors === undefined){
      res.status(500).json({
        message: 'Database could not save the bill'
      });
      return;
    }
    //Validation error
    if (err && theBill.errors) {
      res.status(400).json({
        nameError: theBill.errors.name,
        amountError: theBill.errors.amount,
        dueDateError: theBill.errors.dueDate,
        recurringFrequency: theBill.errors.recurringFrequency
      });
      return;
    }
    //Put the full user info here for Angular
    req.user.encryptedPassword = undefined;
    theBill.user = req.user;
    //Success
    res.status(200).json(theBill)
  }) //close the Bill.Save()
})//close the post route


















module.exports = router;
