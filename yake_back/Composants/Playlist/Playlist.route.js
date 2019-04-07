let express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('cookie-session');
let fs = require('fs');
// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('./Playlist.model');
const process = require('./Playlist.process');

// -- routes declaration
const getAll = '/';
const getPlaylistById = '/getPlaylist';
const getPlaylistByName = '/name/:name';
const getPlaylistByUser = '/user/:user';
const postPlaylist = '/savePlaylist';
lienModifier = '/playlist/:id';
lienSupprimer = '/playlist/:id';
lienGet = '/playlist/:id';
lienGetCover = '/playlist/stream/:id';

// ---- 
// -- GET all
app.get(getAll, function (req, res) {
    let playlist = mongoose.model('Playlist');
    playlist.find().then((playlists)=>{
        res.send(playlists);
    })
});

// -- GET playlist/:id
app.get(getPlaylistById, function (req, res) {
    process.findPlaylistById(req.params.id)
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
});

// -- GET playlist/:name
app.get(getPlaylistByName, function (req, res) {
    process.findPlaylistByName(req.params.name)
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
});

// -- GET playlist/:user
app.get(getPlaylistByUser, function (req, res) {
    process.findPlaylistByUser(req.params.user)
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
});

// -- CREATE
app.post(postPlaylist, function (req, res) {
    process.savePlaylist(req.body)
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
});

// -- GET COVER playlist/stream/:id
app.get(lienGetCover,function (req,res){
	let playlist = mongoose.model('Playlist');
	playlist.find({'_id' : req.params.id}).then((pla)=>{
        if(pla){
			let fs = require('fs');
			pla=pla[0].image;
			if(pla.length>0){
				let rstream = fs.createReadStream(pla);
				rstream.pipe(res);
			}
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});
// -- UPDATE
app.put(lienModifier, function (req, res) {
    process.updatePlaylist(req.body)
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    process.deletePlaylist(req.params.id)
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
});

module.exports = app;
