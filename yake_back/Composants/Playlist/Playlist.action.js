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
     return playlist.find({'nom' : new RegExp('^.*'+req.params.name+'.*$', "ig")});
}