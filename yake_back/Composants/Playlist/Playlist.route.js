// -- Load dependencies
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

// -- Load process
const process = require('./Playlist.process');

// -- Routes declaration
const getAll = '/';
const getPlaylistById = '/getPlaylist';
const getPlaylistByName = '/name/:name';
const getPlaylistByUser = '/user/:user';
const postPlaylist = '/savePlaylist';
const lienModifier = '/playlist/:id';
const lienSupprimer = '/playlist/:id';
const lienGet = '/playlist/:id';
const lienGetCover = '/playlist/stream/:id';

// ---- 
// -- GET all
app.get(getAll, function (req, res) {
    process.getAllPlaylists()
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
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
    process.findPlaylistCover(req.params.id)
    .then(result=>res.status(200).json({}))
    .catch(err=>res.status(500).json({}));
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