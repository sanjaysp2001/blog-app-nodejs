const express = require('express');
const bodyParser = require('body-parser');
const blogRouter = express.Router();
blogRouter.use(bodyParser.json());

blogRouter.route('/')
.get((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('This is the list of blogs!');
})
.post((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('Your Blog is posted Succesfully!')
})
.put((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('PUT not supported');
})
.delete((req,res,next)=>{
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
.post((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('POST not supported');;
})
.put((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('Blog Updated Successfully!');
})
.delete((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('Blog Deleted Successfully!');
})

module.exports = blogRouter;