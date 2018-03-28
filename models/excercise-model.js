const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myExcerciseSchema = new Schema (
  {
    name: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: false
    },
    reps: {
      type: Number,
      required: false
    },
    // historyWeight: {
    //   type: Array,
    //   required: false
    // },
    // historyReps: {
    //   type: Array,
    //   required: false
    // },
    history:[
      {
      reps: Number,
      weight: Number,
      createdAt: Date
    }
  ],
    prWeight: {
      type: Number,
      required: false
    },
    prReps: {
      type: Number,
      required: false
    },
    privateExcercise: {
      type: Boolean,
      required: false,
      default: false
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
);


const ExcerciseModel = mongoose.model('Excercise', myExcerciseSchema);



module.exports = ExcerciseModel;
