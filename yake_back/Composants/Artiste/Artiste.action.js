const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('cookie-session');

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//??
app.use(session({secret: 'todotopsecret'}))
const Model = require('./Artiste.model');
// -- Load model needed for the project
// const Artiste = require('./Artiste.model');

const getAll = function(res) {
    console.log("test");
    const artiste = mongoose.model('Artiste');
    artiste.find().then((artistes)=>{
        res.send(artistes);
    });
}

const getArtiste = function() {
    mongoose.model('Artiste').findOne({_id : req.params.id}).then((artiste)=>{
        if(artiste){
            res.send(artiste);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
}

const getAlbum = function() {
    mongoose.model('Album').findOne({_id : req.params.id}).then((album)=>{
        if(album){
            res.send(album);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
}

exports.getArtisteByName = function(genres,name){
	let artiste = mongoose.model('Artiste');
	let genreFilter = new RegExp('^.*$');
	if(genres !== undefined && genres.length>0){
		genreFilter=genres.split(',').map(ele=>new RegExp('^'+ele+'$','i'));
	}	
	return artiste.find({'nom' : new RegExp('^.*'+name+'.*$', "i"),'albums.genres':{$in : genreFilter}});
};

exports.formatageBlocsArtistepourEnvoi = function(artistes){
	let result = artistes;
		result = result.map(ele=>{
            ele.image=undefined;
			ele.albums=ele.albums.map(album=>{
				album.couverture=undefined;
				album.musiques = album.musiques.map(musique=>{
					musique.son=undefined;
					return musique;
				});
				return album;
			});
			return ele;
	});
	let objetRenvoi=result.map(ele=>{let obj = {}; obj._id=ele._id;obj.nom=ele.nom;return obj;});
	return objetRenvoi;
}