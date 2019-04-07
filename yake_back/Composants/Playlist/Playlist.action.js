const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('cookie-session');

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Model
const Model = require('./Playlist.model');

const getAllPlaylists = function(res){
    let playlist = mongoose.model('Playlist');
    playlist.find().then((playlists)=>{
        res.send(playlists);
    });
}

exports.getPlaylistById = function(id){
    let playlist = mongoose.model('Playlist');
    return playlist.findOne({_id : id});
}

exports.getPlaylistByName = function(name){
    let playlist = mongoose.model('Playlist');
     return playlist.find({'nom' : new RegExp('^.*'+name+'.*$', "ig")});
}

exports.getPlaylistByUser = function(user) {
    let playlist = mongoose.model('Playlist');
    
    return playlist.find({'utilisateur._id' : user});
}

exports.savePlaylist = function(req) {
    let playlist = mongoose.model('Playlist');
	let path = require('path');
	console.log(body);
	let filename = body.fileName;
	let file = body.file;
	body.image=undefined;
	body.fileName=undefined;
	body.file=undefined;
	let newPlaylist = new playlist(body);
	let buf = Buffer.from(file.data);
	fs.writeFile(`${path.resolve('../../Data/playlist')}/${body.nom.replace(/ /gi,"")}_${newPlaylist._id}`,buf,(err)=>{
		if(err)
			return console.log(err);
		console.log("Fichier sauvegardé");
	});
	newPlaylist.image=`${path.resolve('../../Data/playlist')}/${body.nom.replace(/ /gi,"")}_${newPlaylist._id}`;
	
    return newPlaylist.save();
}

exports.updatePlaylist = function(body) {
    let playlist = mongoose.model('Playlist');

    return playlist.updateOne({_id : body.id}, {$set : body}, (err, updatedPlaylist));
}

exports.deletePlaylist = function(id) {
    let playlist = mongoose.model('Playlist');

    return playlist.find({_id : id}).deleteOne();
}