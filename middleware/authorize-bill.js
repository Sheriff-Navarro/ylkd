// const Workout = require('../models/workout-model');
//
// // function authorizeBill(req, res, next) {
// //   Bill.findById(req.params.id, (err, bill) => {
// //     //If there is an error, forward the error:
// //     if (err) {
// //       return next(err)
// //     } //If there is no drive return a (404)
// //     if(!bill){
// //       return next (err)
// //     }
// //     if(bill.belongsTo(req.user)){
// //       return next()
// //     }
// //     else {
// //       return res.redirect('/profile');
// //     }
// //   });
// // }
// //
// function authorizeBill(req, res, next){
//   Bill.findById(req.params.id, (err, bill) =>{
//     if(err) { return next(err)}
//     if(!bill){return next(new Error('404'))}
//     if (Bill.belongsTo(req.user)) {
//       return next()
//     } else {
//       return res.redirect(`/profile`)
//     }
//   })
// }
//
// // function authorizeDrive(req, res, next){
// //     Drive.findById(req.params.id, (err, drive) => {
// // //if there's an error, forward it
// //       if(err) { return next(err) }
// //       //if there is no drive return a 404
// //       if(!drive){ return next(new Error('404'))}
// //       //if the drive belongs to the user, next()
// //       if (drive.belongsTo(req.user)){
// //         return next()
// //       } else {
// //         return res.redirect(`/profile`)
// //       }
// //     });
// // }
//
//
// module.exports = authorizeBill;
