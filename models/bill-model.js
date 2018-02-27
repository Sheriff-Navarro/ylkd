const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myBillSchema = new Schema (
  {
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Date,
      required: true
    },
    recurring: {
      type: Booleann,
      required: true
    },
    recurringDate: {
      type: Date
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
);


const BillModel = mongoose.model('Bill', myBillSchema);



module.exports = BillModel;
