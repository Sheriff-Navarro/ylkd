const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const BillModel = require('../models/bill-model');
const UserModel = require('../models/user-model');
const authorizeBill = require('../middleware/authorize-bill');
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


router.post('/api/bills/:id/delete', (req, res, next) => {
  //Assign billId to the params.id so mongoose can find the bill and delete it from the DB.
  const billId = req.params.id;
  //Delete post method
  BillModel.findByIdAndRemove(billId, (err, bill) => {
    if(err){return next(err)}
    return res.status(200).json({message: 'The Bill has been deleted.'})
  });//BillModel.findByIdAndRemove close
});//Router.post close

//Edit Route:
router.post('/api/bills/:id/edit', (req, res, next) => {
  const billId = req.params.id;
  const updates = {
    name: req.body.billName,
    amount: req.body.billAmount,
    recurringFrequency: req.body.billRecurringFrequency
  };
    BillModel.findByIdAndUpdate(billId, updates, (err, bill) => {
      if (err) {return next(err);}
      return res.status(200).json({
        message: 'The bill information has been updated.'
      });      
    });
});













module.exports = router;
