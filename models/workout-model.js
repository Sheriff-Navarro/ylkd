const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myWorkoutSchema = new Schema (
  {
    name: {
      type: String,
      required: [true, 'Give your workout a name!']
    },
    duration: {
      type: Number,
      required: [false, 'How long does this workout take?']
    },
    excercises: [{ type: Schema.Types.ObjectId, ref: 'Excercise', required: false }]
  ,
  privateWorkout: {
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


const WorkoutModel = mongoose.model('Workout', myWorkoutSchema);



module.exports = WorkoutModel;
