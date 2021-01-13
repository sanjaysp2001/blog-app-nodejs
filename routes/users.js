var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');
var config = require('../config');
var authenticate = require('../authenticate');
var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', (req, res, next)=>{
  res.send("This is the list of users");
});

router.post('/signup',(req,res,next)=>{
  User.register(new User({username: req.body.username}),req.body.password,(err,user)=>{
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-type','application/json');
      res.json({err:err,line:"20"});
    }
    else{
      if(req.body.firstname){
        user.firstname = req.body.firstname;
      }
      if(req.body.lastname){
        user.lastname = req.body.lastname;
      }
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-type','application/json');
          res.json({err:err,line:"33"});
        }
        else{
          passport.authenticate('local'),(req,res,()=>{
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json({success: true,status: "Registration Successful!"})
          });
        }
      });
    }
  });
});

router.post('/login',passport.authenticate('local'),(req,res)=>{
  var token = authenticate.getToken({_id:req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-type','application/json');
  res.send({status: "success",token: token});
});

module.exports = router;
