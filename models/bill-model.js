const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myBillSchema = new Schema (
  {
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    dueDate: {
      type: Date,
      required: false
    },
    recurringFrequency: {
      type: String
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
);


const BillModel = mongoose.model('Bill', myBillSchema);



module.exports = BillModel;
