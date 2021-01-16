const express = require('express');
const bodyParser = require('body-parser');
const Blogs = require('../models/blog');
const User = require('../models/user');
const authenticate = require('../authenticate');
const blogRouter = express.Router();
blogRouter.use(bodyParser.json());

blogRouter.route('/')
.get((req,res,next)=>{
    Blogs.find({})

    .then((blog) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(blog)
    }).catch((err) => {
        next(err);
    });
})
.post(authenticate.verifyUser,(req,res,next)=>{
    req.body.author = req.user._id;
    Blogs.create(req.body)
    .then((blog)=>{
        Blogs.findById(blog._id)
        .populate('author')
        .then((result)=>{
            User.findById(req.user._id)
            .then((user)=>{
                user.blogs.push(blog._id);
                user.save()
                .then((result) => {
                    res.statusCode = 200;
                    res.setHeader('Content-type','application/json');
                    res.json(blog);
                })
            }) 
        })  
    })
    .catch((err)=>{
        next(err);
    });
})
.put(authenticate.verifyUser,(req,res,next)=>{
    var error = new Error("PUT Operation is not supported");
    error.statusCode = 403;
    next(error);
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    var error = new Error("DELETE Operation is not supported");
    error.statusCode = 403;
    next(error);
})

//blogRouter with ID
blogRouter.route('/:blogId')
.get((req,res,next)=>{
    Blogs.findById(req.params.blogId)
    .populate('author')
    .then((blog)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(blog);
    })
    .catch((err)=>{
        next(err);
    })
})
.post(authenticate.verifyUser,(req,res,next)=>{
    var error = new Error('POST operation not supported!');
    res.statusCode = 403;
    next(error);
})
.put(authenticate.verifyUser,(req,res,next)=>{
    Blogs.findByIdAndUpdate(req.params.blogId,{$set:req.body},{new: true})
    .then((blog)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(blog);
    })
    .catch((err)=>{
        next(err);
    })
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Blogs.findByIdAndRemove(req.params.blogId)
    .then((blog)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(blog);
    })
    .catch((err)=>{
        next(err);
    })
})

module.exports = blogRouter;