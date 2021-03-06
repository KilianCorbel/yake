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

const Actions = require('./Artiste.action');
const Model = require('./Artiste.model');

exports.findArtisteByName = function(genres,name){
	return new Promise(function(resolve,reject){
		if(name===undefined ||name.length===0){
			reject(404);
		}
		else{
		Actions.getArtisteByName(genres,name)
		.then(artistes=>{
				artistes = Actions.formatageBlocsArtistepourEnvoi(artistes);
				resolve(artistes);
			})
		.catch((err)=>{reject(404);});
		}
	});

}

exports.findMusiqueByTitle = function(genres,name){
	return new Promise(function (resolve,reject){
		Actions.getMusiqueByTitle(genres,name)
		.then(result=>Actions.filterMusiqueFromResult(result,genres,name))
		.then(result=>resolve(result))
		.catch(err=>reject(err));
	});
}

exports.findAlbumByName = function(genres,name){
	return new Promise(function(resolve,reject){
		Actions.getAlbumByName(genres,name)
		.then(result=>Actions.filterAlbumFromResult(result,genres,name))
		.then(result=>resolve(result), () => reject('Promesse rejetée'))
		.catch(err=>reject(err));
	});
};

exports.findMusiqueById = function(id){
	return new Promise(function(resolve,reject){
		Actions.getMusiqueById(id)
		.then(result=>Actions.formatageMusiquePourRenvoi(result))
		.then(result=>resolve(result))
		.catch(err=>reject(err));
	});
};

exports.getAlbumById = function(params){
	return new Promise(function(resolve,reject){
		Actions.getArtisteHavingAlbumWithId(params.id)
		.then(result=>Actions.formatageBlocAlbumPourEnvoi(result,params.id))
		.then(result=>resolve(result))
		.catch(err=>reject(err));
	});
}

exports.getAllAlbum = function(){
	let artiste = mongoose.model('Artiste');
	return artiste.find({}, 'albums');
}

exports.getAllMusic = function(){
	let artiste = mongoose.model('Artiste');

    return artiste.find({}, 'albums.musiques');
}

exports.addAlbum = function(body){
	return new Promise(function(resolve,reject){
		Actions.getArtisteById(body.idArtiste)
		.then((result)=>{
			return Actions.saveCouverture(body,result);
		}
		)
		.then(result=>{
			return Actions.saveArtisteInDatabase(result.artiste);
		}
		)
		.then(result=>resolve(result))
		.catch(err=>reject(result));
	});
}

exports.addMusique = function(body){
	return new Promise(function(resolve,reject){
		Actions.getArtisteById(body.idArtiste)
		.then((result)=>Actions.saveMusiqueAndEditArtiste(body,result))
		.then((result)=>Actions.saveArtisteInDatabase(result.artiste))
		.then(result=>resolve(result))
		.catch((err)=>reject(err));
	});
}

exports.addArtiste = function(body){
	return new Promise(function(resolve,reject){
		let Artiste = mongoose.model('Artiste');
		Actions.saveImageArtiste(body)
		.then((result)=>new Artiste(result))
		.then((result)=>Actions.saveArtisteInDatabase(result))
		.then(result=>resolve(result))
		.catch(err=>reject(err));
	});
	
}

exports.readAMusique = function(id){
	return new Promise(function(resolve,reject){
		Actions.getMusiqueById(id)
		.then(result=>Actions.cheminMusiquePourLecture(result,id),err=>reject(err))
		.then(result=>Actions.createPipeStreamFromPath(result),err=>reject(err))
		.then(result=>resolve(result))
		.catch(err=>reject(err));
	});
}

exports.getAlbumCover = function(id){
	return new Promise(function(resolve,reject){
		Actions.getAlbumById(id)
		.then(result=>Actions.cheminCouvertureAlbum(result,id),err=>reject(err))
		.then(result=>Actions.createPipeStreamFromPath(result),err=>reject(err))
		.then(result=>resolve(result))
		.catch(err=>reject(err));
	});
}

exports.getArtisteCover = function(id){
	return new Promise(function(resolve,reject){
		Actions.getArtisteById(id)
		.then(result=>Actions.cheminCouvertureArtiste(result,id),err=>reject(err))
		.then(result=>Actions.createPipeStreamFromPath(result),err=>reject(err))
		.then(result=>resolve(result))
		.catch(err=>reject(err));
	});
}

exports.findArtisteById = function(id){
	return new Promise(function(resolve,reject){
		Actions.getArtisteById(id)
		.then(result=>resolve(result))
		.catch(err=>reject(err));
	});	
}
// app.get(, function(req, res) {
// })