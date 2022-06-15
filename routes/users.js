var express = require('express');
var router = express.Router();
const authService = require("../services/auth");
const mysql = require('mysql2');
var models = require("../models");
/* GET users listing. */



router.post('/signup', function (req, res, next) {
  models.user
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password) 
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
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
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.json({message: 'Login successful', jwt: token});
      } else {
        console.log('Wrong password');
        res.send('Wrong password');
      }
    }
  });
});

// PROFILE
router.get('/profile', function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          res.send(JSON.stringify(user));
        } else {
          res.status(401);
          res.send('Invalid authentication token');
        }
      });
  } else {
    res.status(401);
    res.send('Must be logged in');
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

//GET /unauthorized
//messages stating user is unauthorized to view that page
//link to /profile


module.exports = router;
