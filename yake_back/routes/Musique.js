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
require('../models/Musique');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/musique';
lienModifier = '/musique/:id';
lienSupprimer = '/musique/:id';
lienGet = '/musique/:id';

// routes vers le front react
pageErreur ='';
pageMusique = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let musique = mongoose.model('Musique');
    musique.find().then((musiques)=>{
        res.send(musiques);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let musique = mongoose.model('Musique');
    let newMusique = new mongoose.Schema(req.body);
    newMusique.id = newMusique._id;

    newMusique.save().then(()=>{
        res.send(newMusique);
    },(err)=>{
        res.send(err);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Musique').updateOne({_id : req.body.id}, {$set : req.body}, (err, updatedMusique)=>{
       if(err){
            res.send(err);
       }else{
            res.send(updatedMusique);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let musique = mongoose.model('Musique');
    musique.find({_id : req.params.id}).deleteOne().then(()=>{
        res.send(musique);
    },(err)=>{
        res.send(err);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Musique').findOne({_id : req.params.id}).then((musique)=>{
        if(musique){
            res.send(musique);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

module.exports = app;