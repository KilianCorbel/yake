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
app.use(session({secret: 'todotopsecret'}))

// -- Load model needed for the project
require('./Playlist.model');

lienErreur = '/error';
const getAll = '/';
const getPlaylistById = '/getPlaylist';
const getPlaylistByName = '/name/:name';
const getPlaylistByUser = '/user/:user';
const postPlaylist = '/savePlaylist';
lienModifier = '/playlist/:id';
lienSupprimer = '/playlist/:id';
lienGet = '/playlist/:id';
lienGetCover = '/playlist/stream/:id';

// routes vers le front react
pageErreur ='';
pagePlaylist = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- GET all
app.get(getAll, function (req, res) {
    let playlist = mongoose.model('Playlist');
    playlist.find().then((playlists)=>{
        res.send(playlists);
    })
});

// -- GET playlist/:id
app.get(getPlaylistById, function (req, res) {
    mongoose.model('Playlist').findOne({_id : req.query.id}).then((playlist)=>{
        if(playlist){
			playlist.image=undefined;
            res.send(playlist);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

// -- GET playlist/:name
app.get(getPlaylistByName, function (req, res) {
    let playlist = mongoose.model('Playlist');
    
    playlist.find({'nom' : new RegExp('^.*'+req.params.name+'.*$', "ig")}).then((playl)=>{
        res.send(playl);
    },(err)=>{
        res.send(err);
    });
});

// -- GET playlist/:user
app.get(getPlaylistByUser, function (req, res) {
    let playlist = mongoose.model('Playlist');
    
    playlist.find({'utilisateur._id' : req.params.user}).then((playl)=>{
        res.send(playl);
    },(err)=>{
        res.send(err);
    });
});

// -- CREATE
app.post(postPlaylist, function (req, res) {
    let playlist = mongoose.model('Playlist');
	let path = require('path');
	console.log(req.body);
	let filename = req.body.fileName;
	let file = req.body.file;
	req.body.image=undefined;
	req.body.fileName=undefined;
	req.body.file=undefined;
	let newPlaylist = new playlist(req.body);
	let buf = Buffer.from(file.data);
	fs.writeFile(`${path.resolve('../../Data/playlist')}/${req.body.nom.replace(/ /gi,"")}_${newPlaylist._id}`,buf,(err)=>{
		if(err)
			return console.log(err);
		console.log("Fichier sauvé");
	});
	newPlaylist.image=`${path.resolve('../../Data/playlist')}/${req.body.nom.replace(/ /gi,"")}_${newPlaylist._id}`;
	
    //newPLaylist.id = newPLaylist._id;

    newPlaylist.save().then(()=>{
        res.send(newPlaylist);
    },(err)=>{
        res.send(err);
    })
});
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

module.exports = app;
