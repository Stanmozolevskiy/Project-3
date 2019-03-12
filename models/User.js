const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    default: ''
  },
  fitnessGoal: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  tables: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "TablesSchema"
    }
  ]
});
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);
