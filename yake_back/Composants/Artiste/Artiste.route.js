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
let fs = require('fs');
let process = require('./Artiste.process.js');
// -- Load model needed for the project
require('./Artiste.model');
const getAll = '/';
const getArtisteById = '/id/:id';
const getArtisteByName = '/name/:name';
const addAlbum = '/addAlbum';
const addMusique='/addMusique';
const getAlbumById = '/albums/id/:id';
const getAlbumByName = '/albums/name/:name';
const getAlbums = '/albums'
const getMusiqueById = '/albums/musiques/id/:id';
const getMusiqueByTitle = '/albums/musiques/title/:title';
const readMusique = '/albums/musiques/stream/:id';
const getAlbumCover = '/albums/stream/:id';
const getArtisteCover = '/stream/:id';
const getMusiques = '/albums/musiques';
const postArtiste = '/';
// const postAlbum = '/artiste/album';
// const postMusique = "/artiste/album/musique";
const putArtiste = '/:id';
// const putAlbum = '/artiste/album/:id';
// const putMusique = '/artiste/album/musique/:id'
const deleteArtiste = '/:id';
// const deleteAlbum = '/artiste/album/:id';
// const deleteMusique = '/artiste/album/musique/:id';

// module.exports = getAll, getArtiste, getAlbum, getMusique;

// routes vers le front react
pageErreur ='';
pageArtiste = '';

let Artiste = mongoose.model('Artiste');
// -- FIND ALL
app.get(getAll, function (req, res) {
    let artiste = mongoose.model('Artiste');
    artiste.find().then((artistes)=>{
        let result = artistes;
        console.log(result.albums);
        res.send(artistes);
    })
});


//Find Artiste byName
app.get(getArtisteByName, function (req, res) {
	process.findArtisteByName(req.query.genres,req.params.name).then((artistes)=>{
        res.send(artistes);
    })
	.catch(err=>{res.send([]);});
});

// -- GET albums
app.get(getAlbums, function(req, res) {
	process.getAllAlbum()
	.then(albums=>res.send(albums))
	.catch(err=>res.status(404).json({message : "404 not found"}));
});

// -- GET musiques
app.get(getMusiques, function(req, res) {
	process.getAllMusic()
	.then(musics=>res.send(musics))
	.catch(err=>res.status(404).json({message : "404 not found"}));
});

//-POST album
app.post(addAlbum,function(req,res){
	process.addAlbum(req.body)
	.then(result=>res.status(200).json({}))
	.catch(err=>res.status(500).json({}));
});

//POST musique

app.post(addMusique,function(req,res){
	process.addMusique(req.body)
	.then(result=>res.status(200).json({}))
	.catch(err=>res.status(500).json({}));
});
// -- GET album/:id
app.get(getAlbumById, function(req, res) {
	process.getAlbumById(req.params)
    .then(result=>res.send(result))
	.catch(err=>res.status(500).json({err:err}));
});

// -- GET album/:name
// Rajouter tolower / toupper pour les regexp


app.get(getAlbumByName, function(req, res) {
	process.findAlbumByName(req.query.genres,req.params.name)
	.then(result=>res.send(result))
	.catch(err=>res.status(500).json({}));
});

// -- GET musique/:id
app.get(getMusiqueById, function(req, res) {
	process.findMusiqueById(req.params.id)
    .then(result=>res.send(result))
	.catch(err=>res.status(500).json({}));
});

function containsAtLeastOne(tab,referenceTab){
	return tab.reduce((accu,ele)=>{if(accu)return true;return referenceTab.includes(ele.toLowerCase());},false);
}

// -- GET musique/:title
app.get(getMusiqueByTitle, function(req, res) {
	process.findMusiqueByTitle(req.query.genres,req.params.title)
	.then(result=>res.send(result))
	.catch(err=>res.status(500).json({}));
});

// -- CREATE
app.post(postArtiste, function (req, res) {
    process.addArtiste(req.body)
	.then(result=>res.status(200).json({}))
	.catch(err=>res.status(500).json({}));
});


// -- UPDATE
app.put(putArtiste, function (req, res) {
    mongoose.model('Artiste').updateOne({_id : req.body._id}, {$set : req.body}, (err, updatedArtiste)=>{
       if(err){
            res.send(err);
       }else{
            res.send(updatedArtiste);
       }
    });
});

// -- DELETE
app.delete(deleteArtiste, function (req, res) {
    let artiste = mongoose.model('Artiste');
    artiste.find({_id : req.params.id}).deleteOne().then(()=>{
        res.send(artiste);
    },(err)=>{
        res.send(err);
    });
});
//READ a music
app.get(readMusique,function(req,res){
	process.readAMusique(req.params.id)
	.then(result=>result.pipe(res))
	.catch(err=>res.status(404).json({}));
});


//READ albumCover
app.get(getAlbumCover,function (req,res){
	process.getAlbumCover(req.params.id)
	.then(result=>result.pipe(res))
	.catch(err=>res.status(404).json({}));
});

//READ ArtisteCover
app.get(getArtisteCover,function (req,res){
	process.getArtisteCover(req.params.id)
	.then(result=>result.pipe(res))
	.catch(err=>res.status(404).json({}));
});


// -- GET artiste/:id
app.get(getArtisteById, function (req, res) {
	process.findArtisteById(req.params.id)
	.then(result=>res.send(result))
	.catch(err=>res.status(500).json({}));
});

module.exports = app;