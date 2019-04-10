// -- Load Dependencies
const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('cookie-session');

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model
require('./Utilisateur.model');

exports.getAllUsers = function() {
    let user = mongoose.model('Utilisateur');

    return user.find({}, 'utilisateurs');
}

exports.saveUser = function(body) {
    let user = mongoose.model('Utilisateur');
    let newUser = new mongoose.Schema(body);
    newUser.id = newUser._id;

    return newUser.save();
}

exports.updateUser = function(user) {
    let user = mongoose.model('Utilisateur');
    
    return user.updateOne({_id : req.body.id}, {$set : req.body});
}

exports.deleteUser = function(id) {
    let user = mongoose.model('Utilisateur');

    return user.find({_id : id}).deleteOne();
}

exports.getUser = function(id) {
    let user = mongoose.model('Utilisateur');
    
    return user.findOne({_id : req.params.id});
}