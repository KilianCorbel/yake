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

const Actions = require('./Playlist.action');
const Model = require('./Playlist.model');


exports.getAllPlaylists = function () {
    let playlist = mongoose.model('Playlist');
    return playlist.find({}, 'playlists');   
}

exports.findPlaylistByName = function(name) {
    return new Promise(function(resolve, reject) {
        if (name === undefined || name.length===0) {
            reject(404);
        }
        else {
            Actions.getPlaylistByName(name)
            .then(playlists=>{
                resolve(playlists);
            })
            .catch((err)=>{
                reject(404);
            });
        }
    })
}

exports.findPlaylistById = function(id) {
    return new Promise(function(resolve, reject) {
        if (id === undefined || id === 0) {
            reject(404);
        }
        else {
            Actions.getPlaylistById(id)
            .then(playlists=>{
                resolve(playlists);
            })
            .catch((err)=>{
                reject(404);
            });
        }
    })
}