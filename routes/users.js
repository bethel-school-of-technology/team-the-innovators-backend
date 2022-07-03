var express = require('express');
var router = express.Router();
const authService = require("../services/auth");

const mysql = require('mysql2');
var models = require("../models");

/* GET users listing. */

//Sign Up
router.post('/signup', function (req, res, next) {
  models.user
    .findOrCreate({
      where: {
        Username: req.body.Username
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: authService.hashPassword(req.body.Password)
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.json({
          message: "Signup Successful"
        });
      } else {
        res.json({
          message: "User Not Created"
        });
      }
    });
});

//Log In
router.post('/login', function (req, res, next) {
  models.user.findOne({
    where: {
      Username: req.body.Username
    }
  }).then(user => {
    if (!user) {
      res.json({
        message: "User Not Found",
        status: 500
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.Password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.json({
          message: "Login Successful",
          status: 200,
          token
        });
      } else {
        console.log('Wrong Password');
        res.json({
          message: "Wrong Password",
          status: 403
        });
      }
    }
  });
});

// PROFILE
router.get('/profile', function (req, res, next) {
  console.log(req.headers);
  let token = req.headers.authorization;
  console.log(token);
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.json({
            message: "Profile Loaded Successfully",
            status: 200,
            user
          });
        } else {
          res.json({
            message: "Invalid Token",
            status: 403
          });
        }
      });
  } else {
    res.json({
      message: "Missing Token",
      status: 403
    });
  }
});

// LOGOUT
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});

// View all users if admin
router.get('/admin/users', function (req, res, next) {
  console.log(req.headers);
  let token = req.headers.authorization;
  console.log(token);
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          models.user
            .findAll({ where: { Deleted: false }, raw: true })
            .then(usersFound => 
              res.json({
                message: "Users Found",
                status: 200,
                users: usersFound }
              ));
        } else {
          res.send('Unauthorized')
        }
      });
  } else {
    res.redirect('/users/login');
  }
});

// 'Delete' user if an admin
router.delete('/admin/users/:id', function (req, res, next) {
  console.log('Enter Delete...');
  console.log(':id ' + req.params.id);
  let userId = parseInt(req.params.id);
  console.log('Before Checking for Admin');
  // Verify Admin 
  let token = req.headers.authorization;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.Admin) {
          // Admin is logged in
          console.log('We have an Admin!');
          models.user
            .update(
              { Deleted: true },
              { where: { UserId: userId } },
              { raw: true }
            )
            .then(response => {
              res.json({message:'User deleted'});
            });
        } else {
          res.json({message:'Unauthorized'});
        }
      })
  }
});

module.exports = router;
