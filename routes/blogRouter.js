const express = require('express');
const bodyParser = require('body-parser');
const blogRouter = express.Router();
blogRouter.use(bodyParser.json());

blogRouter.route('/')
.get((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.send('This is the list of blogs!');
    next();
})
.post((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader = ('Content-type','text/html');
    res.send('Your Blog is posted Succesfully!')
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.setHeader('Content-type','text/html');
    var err = new Error('You cant do PUT operation on "/"')
    next(err);
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
    res.send(`Displaying Blog with id : ${blogId}`);
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.setHeader('Content-type','text/html');
    var err = new Error('You cant do POST operation on "/:blogId"')
    next(err);
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