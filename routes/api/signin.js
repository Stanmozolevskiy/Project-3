const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const TablesSchema = require('../../models/Tables');


module.exports = (app) => {
  /*  
   * Sign up
   */
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;
    let { firstName } = body;
    let { lastName } = body;
    let { age } = body;
    let { fitnessGoal } = body;

    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }

      // Save the new user
      const newUser = new User();

      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.age = age;
      newUser.fitnessGoal = fitnessGoal;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });


  });

  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;


    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }

        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id,
          userId: doc.userId
        });
      });
    });
  });

  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        return res.send({
          success: true,
          message: 'Good',
          userId: sessions[0].userId
        });
      }
    });
  });

  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
        $set: {
          isDeleted: true
        }
      }, null, (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
      
        return res.send({
          success: true,
          message: 'Good',
        });
      });
  });

  // Find User By ID
  app.get('/user/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id, function (err, result) {
      if (err) {
        // console.log(err);
      }
      else {
        res.json(result);
      }
    });
  });

  //Get the data from the react-bootstrap-tables to put into the database
  app.post("/api/tables", function(req, res) {
    // Create a new exercise in the db
    TablesSchema.create(req.body)
      .then(function(tbData) {
        console.log(tbData)
        // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return User.findOneAndUpdate({}, { $push: { tables: tbData._id} }, { new: true });
      })
      .then(function(tbData) {
        // If the User was updated successfully, send it back to the client
        res.json(tbData);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });

  //route to update each row in the exercise and food tables
  app.put("/api/update", function(req, res) {
    TablesSchema.findOneAndUpdate({}, {$set: req.body}, {new: true})  //req.body._id in curl brackets <- stick to db from now on
    .then(function(data) {
      console.log(data);
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    })
  })

  //route for charts js
  app.get("/api/data", function(req, res) {
    // Find the user that is signed in
    TablesSchema.find(req.body._id) //change to req.body._id for prod
      .then(function(chartData) {
        // If user found, send them back to the client
        res.json(chartData);
      })
      .catch(function(err) {
        // If an error occurs, send the error back to the client
        res.json(err);
      })
  });


  app.get("/api/tables", function(req, res) {
    // Find all users
    User.find({firstName:"Scott"}) //_id: req.body.id
      // Specify that we want to populate the retrieved users with any associated notes
      .populate("tables")
      .then(function(tbData) {
        // If able to successfully find and associate all Users and Notes, send them back to the client
        res.json(tbData);
        console.log(tbData);
      })
      
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });

};