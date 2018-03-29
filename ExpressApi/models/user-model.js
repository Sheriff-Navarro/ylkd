const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myUserSchema = new Schema (
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    encryptedPassword: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      default: '../../assets/images/user.svg'
    },
    weight: {
    type: Number,
    required: false
    },
    height: {
    type: Number,
    required: false
    },
    workouts: [{type: Schema.Types.ObjectId, ref: 'Workout', required: true}],
    excercises: [{type: Schema.Types.ObjectId, ref: 'Excercise', required: true}]
  },
  {
    timestamps: true
  }
);


const UserModel = mongoose.model('User', myUserSchema);



module.exports = UserModel;
