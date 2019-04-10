// - Load Dependencies
const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('cookie-session'),
    fs = require('fs');

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const Actions = require('./Playlist.action');


exports.getAllPlaylists = function () {
    return new Promise(function(resolve, reject) {
        Actions.getAllPlaylists()
        .then(playlists => {
            resolve(playlists);
        })
        .catch(err => {
            reject(404);
        })
    })
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

exports.findPlaylistByUser = function(user) {
    return new Promise(function(resolve, reject) {
        if (user === undefined || user.length === 0){
            reject(404);
        }
        else {
            Actions.getPlaylistByUser(user)
            .then(playlists=>{
                resolve(playlists);
            })
            .catch((err)=>{
                reject(404);
            })
        }
    })
}

exports.savePlaylist = function(playlist) {
    return new Promise(function(resolve, reject) {
        if (playlist === undefined || playlist.length === 0){
            reject(404);
        }
        else {
            Actions.savePlaylist(playlist)
            .then(playlists=>{
                resolve(playlists);
            })
            .catch((err)=> {
                reject(404);
            })           
        }
    })
}

exports.deletePlaylist = function(id) {
    return new Promise(function(resolve, reject) {
        if (id === undefined || id === 0){
            reject(404);
        }
        else {
            Actions.deletePlaylist(id)
            .then(playlist=>{
                console.log(playlist);
                resolve(playlist);
            })
            .catch(err=>{
                reject(404);
            })
        }
    })
}

exports.updatePlaylist = function(body) {
    return new Promise(function(resolve, reject) {
        if (body === undefined || body.length === 0){
            reject(404);
        }
        else {
            Actions.updatePlaylist(body)
            .then(playlist=>{
                console.log(playlist);
                resolve(playlist);
            })
            .catch(err=> {
                reject(404);
            })
        }
    })
}

exports.findPlaylistCover = function(id) {
    return new Promise(function(resolve, reject) {
        if (id === undefined || id === 0){
            reject(404);
        }
        else {
            Actions.getCoverPlaylist(id)
            .then(playlist => {
                if (playlist.length > 0) {
                    // ouvre le stream avec le fichier
                    let rstream = fs.createReadStream(playlist);
                    // retourne la référence vers le fichier
                    resolve(rstream.pipe(playlist));
                }
            })
            .catch(err => {
                reject(404);
            })
        }
    })
}