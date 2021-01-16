const express = require('express');
const bodyParser = require('body-parser');
const Blogs = require('../models/blog');
const User = require('../models/user');
const authenticate = require('../authenticate');
const myBlogRouter = express.Router();
myBlogRouter.use(bodyParser.json());

myBlogRouter.route('/')
.get(authenticate.verifyUser,(req,res,next)=>{
    User.findById(req.user._id)
    .populate('blogs')
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(user.blogs);
    })
    .catch((err)=>{
        next(err);
    })
})
.post(authenticate.verifyUser,(req,res,next)=>{
    var error = new Error('POST is not supported at myblogs/')
    res.statusCode = 403;
    next(error);
})
.put(authenticate.verifyUser,(req,res,next)=>{
    var error = new Error('PUT is not supported at myblogs/')
    res.statusCode = 403;
    next(error); 
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Blogs.remove({author:req.user._id})
    .then((blog)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(blog);
    })
    .catch((err)=>{
        next(err);
    })
})

module.exports = myBlogRouter;