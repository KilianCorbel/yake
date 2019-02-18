let express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('cookie-session');

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({secret: 'todotopsecret'}))

const Routes = require('./Artiste.route');
const Actions = require('./Artiste.action');
const Model = require('./Artiste.model');

// app.get(, function(req, res) {
// })