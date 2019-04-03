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


//modifs Baptiste
exports.getArtisteByName = function(genres,name){
	let artiste = mongoose.model('Artiste');
	let genreFilter = new RegExp('^.*$');
	let findObject = {};
	findObject.nom = new RegExp('^.*'+name+'.*$', "i");
	if(genres !== undefined && genres.length>0){
		genreFilter=genres.split(',').map(ele=>new RegExp('^'+ele+'$','i'));
		findObject['albums.genres']={$in : genreFilter};
	}
	return artiste.find(findObject);
};

exports.getArtisteById = function(id){
	let artiste = mongoose.model('Artiste');
	return artiste.findOne({'_id' : id});
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
};

exports.saveCouverture = function(body,artiste){
	return new Promise(function(resolve,reject){
	console.log("saveCouverture");
	let path = require("path");
	let fs = require("fs");
	let buf = Buffer.from(body.couverture.data);
	fs.writeFile(`${path.resolve("../../Data/couverture")}/${artiste.nom}_${body.nom}_couverture`,buf,(err)=>{
			if(err)
				reject(err);
			else{
				body.couverture=`${path.resolve("../../Data/couverture")}/${artiste.nom}_${body.nom}_couverture`;
				body.idArtiste=undefined;	
				body.fileName=undefined;
				let test = require('./Artiste.model.js');
				artiste.albums.push(new test.Album(body));
				let returnObject = {};
				returnObject.body=body;
				returnObject.artiste = artiste;
				resolve(returnObject);
			}
	});
	});
};

exports.saveMusiqueAndEditArtiste = function(body,artiste){
	return new Promise(function(resolve,reject){
		let path = require('path');
		let fs = require('fs');
		let filePath="";
		console.log("test");
		console.log(artiste);
		if(artiste.albums.filter((ele)=>ele._id.toString()===body.idAlbum).length>0){
			let buf = Buffer.from(body.son.data);
			body.idArtiste=undefined;
			body.note=undefined;
			artiste.albums = artiste.albums.map(ele=>{
				if(ele._id.toString()===body.idAlbum){
					filePath=`${path.resolve("../../Data/musique")}/${artiste.nom}_${ele.nom}_${body.titre}_musique`;
					fs.writeFile(`${path.resolve("../../Data/musique")}/${artiste.nom}_${ele.nom}_${body.titre}_musique`,buf,(err)=>{
						if(err)
							reject(artiste);
						}
					);
					body.son=filePath;
					let test = require('./Artiste.model.js');
					ele.musiques.push(new test.Musique(body));
				}
				return ele;
			});
			body.idAlbum=undefined;
			let returnedObject = {};
			returnedObject.body = body;
			returnedObject.artiste = artiste;
			resolve(returnedObject);
		}
		else{
			reject("L'album n'existe pas");
		}
	});
}

exports.saveImageArtiste = function(body){
	return new Promise(function(resolve,reject){
		let buf = Buffer.from(body.image.data);
		let path = require('path');
		let fs = require('fs');
		fs.writeFile(`${path.resolve('../../Data/artiste')}/${body.nom}`,buf,(err)=>{
			if(err)
				reject(err);
		});
		body.fileName=undefined;
		body.image=path.resolve('../../Data/artiste')+"/"+body.nom;
		resolve(body);
	});
};

exports.saveArtisteInDatabase = function(artiste){
	return artiste.save();
}