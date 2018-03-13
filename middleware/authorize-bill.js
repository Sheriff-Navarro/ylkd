const Bill = require('../models/bill-model');


function authorizeBill(req, res, next) {
  Bill.findById(req.params.id, (err, drive) => {
    //If there is an error, forward the error:
    if (err) {
      return next(err)
    } //If there is no drive return a (404)
    if(!drive){
      return next (new Error('404'))
    }
    if(bill.belongsTo(req.user)){
      return next()
    }
    else {
      return res.redirect('/profile')
    }
  });
}


module = authorizeBill;
