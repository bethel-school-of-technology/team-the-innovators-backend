var express = require('express');
var router = express.Router();
const authService = require("../services/auth");
<<<<<<< HEAD
const mysql = require('mysql2');
var models = require("../models");
/* GET users listing. */


=======
let models = require('../models');

/* GET users listing. */
>>>>>>> 04510a7f1fcade38f9aaad27dff3bbacc1976217

router.post('/signup', function (req, res, next) {
  models.user
    .findOrCreate({
      where: {
        Username: req.body.Username
      },
      defaults: {
<<<<<<< HEAD
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password) 
=======
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: authService.hashPassword(req.body.Password)
>>>>>>> 04510a7f1fcade38f9aaad27dff3bbacc1976217
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

router.post('/login', function (req, res, next) {
  models.user.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user) {
      res.json({
        message: "User Not Found",
        status: 500
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
<<<<<<< HEAD
        
=======
>>>>>>> 04510a7f1fcade38f9aaad27dff3bbacc1976217
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

router.get("/", function(req, res, next){

  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        console.log(user);
        if (user) {
          const users = models.user.findAll().then(users => {
            res.send(JSON.stringify(users));

          });
          
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
  }

  // if(req.user && req.user.Admin){
  //  //findAll
  //  //render and send all users to the view 
  // } else{
  //   res.redirect("unauthorized")
  // }
});

// LOGOUT
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});



module.exports = router;
