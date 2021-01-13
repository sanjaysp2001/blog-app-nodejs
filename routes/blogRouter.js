const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const blogRouter = express.Router();
blogRouter.use(bodyParser.json());

blogRouter.route('/')
.get((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('This is the list of blogs!');
})
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('Your Blog is posted Succesfully!')
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('PUT not supported');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('All Blogs deleted successfully');
})

//blogRouter with ID
blogRouter.route('/:blogId')
.get((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send(`Displaying Blog with id : ${req.params.blogId}`);
})
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('POST not supported');;
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('Blog Updated Successfully!');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('Blog Deleted Successfully!');
})

module.exports = blogRouter;