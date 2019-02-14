let express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('cookie-session');

// --- Middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({secret: 'todotopsecret'}))

// -- Load model needed for the project
require('../models/Album');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/album';
lienModifier = '/album/:_id';
lienSupprimer = '/album/:id';
lienGet = '/album/:id';

// -- Routes vers le front react
pageErreur ='';
pageAlbum = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let album = mongoose.model('Album');
    album.find().then((albums)=>{
        res.send(albums);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let Album = mongoose.model('Album');
    console.log(req.body);
    let newAlbum = new Album(req.body);
    newAlbum.id = newAlbum._id;

    newAlbum.save().then(()=>{
        res.send(newAlbum);
    },(err)=>{
        res.send(err);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log(req.params);
    mongoose.model('Album').updateOne({id : req.id}, {$set : req.body}, (err, updatedAlbum)=>{
       if(err){
            res.send(err);
       }else{
            res.send(updatedAlbum);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let album = mongoose.model('Album');
    album.find({_id : req.params.id}).deleteOne().then(()=>{
        res.send(album);
    },(err)=>{
        res.send(err);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Album').findOne({_id : req.params.id}).then((album)=>{
        if(album){
            res.send(album);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

module.exports = app;