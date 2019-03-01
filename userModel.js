var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;


var UserSchema = new Schema({
 
  userName: {
    type: String,
    trim: true,

    required: false
  },

  firstName: {
      type: String
  },

  lastName: {
      type: String

  },
  
  userPassword: {
    type: String,
    trim: true,

    required: false,

    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
  },
  
  userEmail: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  // `date` must be of type Date. The default value is the current date
  userCreated: {
    type: Date,
    default: Date.now
  }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;

