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
require('./Playlist.model');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/playlist';
lienModifier = '/playlist/:id';
lienSupprimer = '/playlist/:id';
lienGet = '/playlist/:id';

// routes vers le front react
pageErreur ='';
pagePlaylist = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let playlist = mongoose.model('Playlist');
    playlist.find().then((playlists)=>{
        res.send(playlists);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let playlist = mongoose.model('Playlist');
    let newPLaylist = new mongoose.Schema(req.body);
    newPLaylist.id = newPLaylist._id;

    newPLaylist.save().then(()=>{
        res.send(newPLaylist);
    },(err)=>{
        res.send(err);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Playlist').updateOne({_id : req.body.id}, {$set : req.body}, (err, updatedPlaylist)=>{
       if(err){
            res.send(err);
       }else{
            res.send(updatedPlaylist);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let playlist = mongoose.model('Playlist');
    playlist.find({_id : req.params.id}).deleteOne().then(()=>{
        res.send(playlist);
    },(err)=>{
        res.send(err);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Playlist').findOne({_id : req.params.id}).then((playlist)=>{
        if(playlist){
            res.send(playlist);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

module.exports = app;