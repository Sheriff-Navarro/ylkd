const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myIncomeSchema = new Schema (
  {
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    receivingDate: {
      type: Boolean,
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


const IncomeModel = mongoose.model('Income', myIncomeSchema);



module.exports = IncomeModel;
