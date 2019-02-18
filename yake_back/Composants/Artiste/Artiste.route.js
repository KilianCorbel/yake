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
require('./Artiste.model');

const getAll = '/';
const getArtiste = '/:id';
const getAlbum = '/albums/:id';
const getAlbums = '/albums'
const getMusique = '/albums/musiques/:id';
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

// -- GET albums
app.get(getAlbums, function(req, res) {
    let artiste = mongoose.model('Artiste');

    artiste.find({}, 'albums').then((albums)=>{
        if(albums){
            res.send(albums);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

// -- GET musiques
app.get(getMusiques, function(req, res) {
    let artiste = mongoose.model('Artiste');

    artiste.find({}, 'albums.musiques').then((musiques)=>{
        if(musiques){
            res.send(musiques);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

// -- GET album/:id
app.get(getAlbum, function(req, res) {
    let artiste = mongoose.model('Artiste');

    artiste.find({'albums._id' : req.params.id}, {'albums.$':1}).then((album)=>{
        if(album){
            res.send(album);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

// -- GET musique
app.get(getMusique, function(req, res) {
    let artiste = mongoose.model('Artiste');

    artiste.find({'albums.musiques._id' : req.params.id}, {'albums.musiques.$':1}).then((musique)=>{
        if(musique){
            res.send(musique[0]);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

// -- CREATE
app.post(postArtiste, function (req, res) {
    let artiste = mongoose.model('Artiste');
    let newArtiste = new mongoose.Schema(req.body);
    newArtiste.id = newArtiste._id;

    newArtiste.save().then(()=>{
        res.send(newArtiste);
    },(err)=>{
        res.send(err);
    })
});

// -- UPDATE
app.put(putArtiste, function (req, res) {
    mongoose.model('Artiste').updateOne({_id : req.body.id}, {$set : req.body}, (err, updatedArtiste)=>{
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

// -- READ
app.get(getArtiste, function (req, res) {
    mongoose.model('Artiste').findOne({_id : req.params.id}).then((artiste)=>{
        if(artiste){
            res.send(artiste);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

module.exports = app;