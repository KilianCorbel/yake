let express = require('express'),
    app = express(),
    router = express.Router();
    session = require('cookie-session');

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({secret: 'todotopsecret'}))

// -- Load model needed for the project
require('../models/Playlist');

lienErreur = '/error';
lienAll = '/playlist/';
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
        res.render(pagePlaylist, playlists);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let playlist = mongoose.model('Playlist');
    let newPLaylist = new Playlist(req.body);
    newPLaylist.id = newPLaylist._id;

    newPLaylist.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Playlist').updateOne({id : req.body.id}, {$set : req.body}, (err, updatedPlaylist)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let playlist = mongoose.model('Playlist');
    playlist.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Playlist').findOne({id : req.params.id}).then((playlist)=>{
        if(playlist){
            res.render(pageBatiment, playlist);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;