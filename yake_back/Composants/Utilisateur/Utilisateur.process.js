// - Load Dependencies
const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('cookie-session'),
    fs = require('fs');

// --- Middleware
// - body-parser needed to catch and to treat information inside req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const Actions = require('./Utilisateur.action');

exports.findAllUsers = function() {
    return new Promise(function(resolve, reject) {
        Actions.getAllUsers()
        .then(users => {
            resolve(user);
        })
        .catch(err => {
            reject(404);
        })
    })
}

exports.saveUser = function(body) {
    return new Promise(function(resolve, reject) {
        if (body === undefined || body.length === 0){
            reject(404);
        }
        else {
            Actions.saveUser(body)
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(404);
            })
        }
    })
}

exports.updateUser = function(body) {
    return new Promise(function(resolve, reject) {
        if (body === undefined || body.length === 0){
            reject(404);
        }
        else {
            Actions.updateUser(body)
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(404);
            })
        }
    })
}

exports.deleteUser = function(id) {
    return new Promise(function(resolve, reject) {
        if (id === undefined || id.length === 0) {
            reject(404);
        }
        else {
            Actions.deleteUser(id)
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(404);
            })
        }
    })
}

exports.findUser = function(id) {
    return new Promise(function(resolve, reject) {
        if (id === undefined || id === 0) {
            reject(404);
        }
        else {
            Actions.getUser(id)
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(404);
            })
        }
    })
}