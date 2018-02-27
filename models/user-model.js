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
    bill: [{type: Schema.Types.ObjectId, ref: 'Bill', required: true}],
    income: [{type: Schema.Types.ObjectId, ref: 'Income', required: true}]
  },
  {
    timestamps: true
  }
);


const UserModel = mongoose.model('User', myUserSchema);



module.exports = UserModel;
