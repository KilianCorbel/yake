// -- Load dependencies
let express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('cookie-session');

// -- Middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({secret: 'todotopsecret'}))

// -- Load process
const process = require('./Utilisateur.process');

// -- Define routes
const lienErreur = '/error',
    lienAll = '/',
    lienAjouter = '/user',
    lienModifier = '/user/:id',
    lienSupprimer = '/user/:id',
    lienGet = '/user/:id';

// -- GET ALL
app.get(lienAll, function (req, res) {
    process.findAllUsers()
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
});

// -- CREATE
app.post(lienAjouter, function (req, res) {
    process.saveUser(req.body)
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    process.updateUser(req.body)
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    process.deleteUser(req.params.id)
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
});

// -- GET/:id
app.get(lienGet, function (req, res) {
    process.findUser(req.params.id)
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
});

module.exports = app;