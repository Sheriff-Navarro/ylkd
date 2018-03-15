const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const BillModel = require('../models/bill-model');
const IncomeModel = require('../models/income-model');
const UserModel = require('../models/user-model');
const authorizeBill = require('../middleware/authorize-bill');
const router = express.Router();

router.post('/api/income', (req, res, next) => {
if(!req.user) {
    res.status(401).json({message: 'Log in to create a income resource.'})
    return;
  }
const theIncome = new IncomeModel({
  name: req.body.incomeName,
  amount: req.body.incomeAmount,
  receivingDate: req.body.incomeReceivingDate,
  recurringFrequency: req.body.incomeRecurringFrequency,
  user: req.user._id
  });
//Handle the unknown errors from the database.
theIncome.save((err) =>{
  if(err && theIncome.errors === undefined){
      res.status(500).json({
        message: 'Database could not save the income resource.'
      });
      return;
    }
    //Validation error
    if (err && theIncome.errors) {
      res.status(400).json({
        nameError: theIncome.errors.name,
        amountError: theIncome.errors.amount,
        incomeReceivingDateError: theIncome.errors.receivingDate,
        recurringFrequencyError: theIncome.errors.recurringFrequency
      });
      return;
    }
    //Put the full user info here for Angular, BUT hide their password Bcrypt hash.
    req.user.encryptedPassword = undefined;
    theIncome.user = req.user;
    //Success
    res.status(200).json(theIncome)
  }) //close the Bill.Save()
})//close the post route

router.post('/api/income/:id/delete', (req, res, next) => {
  const incomeId = req.params.id;
  IncomeModel.findByIdAndRemove(incomeId, (err, income) => {
    if(err){return next(err)}
    return res.status(200).json({message: 'Income resource deleted.'})
  })
})

//Edit Route:
router.post('/api/income/:id/edit', (req, res, next) => {
  const incomeId = req.params.id;
  const updates = {
    name: req.body.incomeName,
    amount: req.body.incomeAmount,
    recurringFrequency: req.body.incomeRecurringFrequency};
    IncomeModel.findByIdAndUpdate(incomeId, updates, (err, income) => {
      if (err) {return next(err);}
      return res.status(200).json({
      message: 'Income has been updated.'})
    });
});




module.exports = router;
