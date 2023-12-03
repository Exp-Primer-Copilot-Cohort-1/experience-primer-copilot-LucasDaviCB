// Create web server for comment
// Import module
// Handle request
// Export module
// Import module
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import model
const Comments = require('../models/comments');

// Create web server
const commentRouter = express.Router();

// Use module
commentRouter.use(bodyParser.json());

// Handle request
// Handle request for '/'
commentRouter.route('/')
    .get((req, res, next) => {
        // Find all comments
        Comments.find({})
            .then((comments) => {
                // Send status code and comments
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        // Create comment
        Comments.create(req.body)
            .then((comment) => {
                // Send status code and comment
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        // Send status code and message
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments');
    })
    .delete((req, res, next) => {
        // Remove all comments
        Comments.remove({})
            .then((resp) => {
                // Send status code and response
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// Handle request for '/:commentId'
commentRouter.route('/:commentId')
    .get((req, res, next) => {
        // Find comment by id
        Comments.findById(req.params.commentId)
            .then((comment) => {
                // Send status code and comment
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        // Send status code and message
        res.statusCode = 403;
        res.end
    })