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

// -- Load model needed for the project
require('../models/Genre');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/genre';
lienModifier = '/genre/:id';
lienSupprimer = '/genre/:id';
lienGet = '/genre/:id';

// routes vers le front react
pageErreur ='';
pageGenre = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let genre = mongoose.model('Genre');
    genre.find().then((genres)=>{
        res.send(genres);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let genre = mongoose.model('Genre');
    let newGenre = new mongoose.Schema(req.body);
    newGenre.id = newGenre._id;

    newGenre.save().then(()=>{
        res.send(newGenre);
    },(err)=>{
        res.send(err);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Genre').updateOne({_id : req.body.id}, {$set : req.body}, (err, updatedGenre)=>{
       if(err){
            res.send(err);
       }else{
            res.send(updatedGenre);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let genre = mongoose.model('Genre');
    genre.find({_id : req.params.id}).deleteOne().then(()=>{
        res.send(genre);
    },(err)=>{
        res.send(err);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Genre').findOne({_id : req.params.id}).then((genre)=>{
        if(genre){
            res.send(genre);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

module.exports = app;