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
require('../models/Artiste');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/artiste';
lienModifier = '/artiste/:id';
lienSupprimer = '/artiste/:id';
lienGet = '/artiste/:id';

// routes vers le front react
pageErreur ='';
pageArtiste = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let artiste = mongoose.model('Artiste');
    artiste.find().then((artistes)=>{
        res.send(artistes);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let artiste = mongoose.model('Artiste');
    let newArtiste = new mongoose.Schema(req.body);
    newArtiste.id = newArtiste._id;

    newArtiste.save().then(()=>{
        res.send(newArtiste);
    },(err)=>{
        res.send(err);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Artiste').updateOne({_id : req.body.id}, {$set : req.body}, (err, updatedArtiste)=>{
       if(err){
            res.send(err);
       }else{
            res.send(updatedArtiste);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let artiste = mongoose.model('Artiste');
    artiste.find({_id : req.params.id}).deleteOne().then(()=>{
        res.send(artiste);
    },(err)=>{
        res.send(err);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Artiste').findOne({_id : req.params.id}).then((artiste)=>{
        if(artiste){
            res.send(artiste);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

module.exports = app;