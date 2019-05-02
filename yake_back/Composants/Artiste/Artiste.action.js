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

exports.getAlbumByName = function(genres,name){
	let artiste = mongoose.model('Artiste');
	let genreFilter = new RegExp('^.*$');
	let findObject = {};
	findObject['albums.nom'] = new RegExp('^.*'+name+'.*$', "i");
	if(genres !== undefined && genres.length>0){
		genreFilter=genres.split(',').map(ele=>new RegExp('^'+ele+'$','i'));
		findObject['albums.genres']={$in : genreFilter};
	}
    return artiste.find(findObject);	
}

exports.getMusiqueByTitle = function(genres,name){
	let artiste = mongoose.model('Artiste');
	let genreFilter = new RegExp('^.*$');
	let findObject = {};
	findObject['albums.musiques.titre'] = new RegExp('^.*'+name+'.*$', "i");
	if(genres !== undefined && genres.length>0){
		genreFilter=genres.split(',').map(ele=>new RegExp('^'+ele+'$','i'));
		findObject['albums.genres']={$in : genreFilter};
	}
    return artiste.find(findObject);
	
}

exports.filterMusiqueFromResult = function(artiste,genres,name){
	return new Promise(function (resolve,reject){
		let genre = undefined;
		if(genres !== undefined && genres.length>0){
			genre=req.query.genres.split(',').map(ele=>ele.toLowerCase());
		}
		if(artiste){
				console.log(artiste);
				albums = artiste.map(arti=>arti.albums.map(alb=>{
					let retour = {};
					retour.musiques=alb.musiques;
					retour._id=alb._id;
					retour.nom = alb.nom;
					retour.nomGroupe = arti.nom;
					retour.idGroupe=arti._id;
					retour.genres=alb.genres;
					return retour})
					.reduce((prev,ele)=>prev.concat(ele),[]))
					.reduce((prev,ele)=>prev.concat(ele),[]);
				mus = albums.map(alb=>alb.musiques.map(mus=>{
					let musicObj={};
					musicObj.nomGroupe=alb.nomGroupe;
					musicObj.idAlbum=alb._id;
					musicObj.genres=alb.genres;
					musicObj.nomAlbum=alb.nom;
					musicObj.idGroupe = alb.idGroupe;
					musicObj.titre=mus.titre;
					musicObj._id=mus._id;
					musicObj.note = mus.notes;
					return musicObj;
				}).reduce((prev,ele)=>prev.concat(ele),[])).reduce((prev,ele)=>prev.concat(ele),[]).filter(ele=>{if(genre===undefined)return true;return containsAtLeastOne(ele.genres,genre)}).filter(ele=>ele.titre.toLowerCase().includes(name.toLowerCase()));
				if(mus !== undefined)
					mus.map(ele=>{ele.note = ele.note.reduce((prev,elem)=>prev+elem.note,0)/ele.note.length;return ele;});
				resolve(mus);
		}
		else{
			reject("Erreur lors du filtrage des musiques");
		}
	});
}

exports.getMusiqueById = function(id){
	let artiste = mongoose.model('Artiste');
    return artiste.find({'albums.musiques._id' : id}, 'albums.musiques');
};

exports.formatageMusiquePourRenvoi = function(artiste){
	return new Promise(function(resolve,reject){
	if(artiste){
            artiste=artiste[0].albums.reduce((prev,ele)=>prev.concat(ele),[])
            .reduce((prev,ele)=>prev.concat(ele.musiques),[])
            .filter(ele=>ele._id.toString()===req.params.id)[0];
            resolve(artiste);
        }
	else{
           reject("Aucune musique trouvée");
    }	
	});
};

function containsAtLeastOne(tab,referenceTab){
	return tab.reduce((accu,ele)=>{if(accu)return true;return referenceTab.includes(ele.toLowerCase());},false);
}

exports.filterAlbumFromResult = function(artiste,genres,name){
	console.log(artiste);
	if(artiste){
		let genre = undefined;
		if(genres !== undefined && genres.length>0){
			genre=genres.split(',').map(ele=>ele.toLowerCase());
		}
		artiste = artiste.map(arti=>{arti.albums=arti.albums.filter(album=>{if(genre===undefined)return true;return containsAtLeastOne(album.genres,genre);}).filter(album=>album.nom.toLowerCase().includes(name.toLowerCase()));return arti;});
		artiste = artiste.map(arti=>arti.albums.map(alb=>{let retour = {};retour.musiques=alb.musiques;retour._id=alb._id;retour.nom = alb.nom;retour.nomGroupe = arti.nom;retour.idGroupe=arti._id;return retour}).reduce((prev,ele)=>prev.concat(ele),[])).reduce((prev,ele)=>prev.concat(ele),[]);
		artiste = artiste.map(ele=>{let obj = {}; obj._id=ele._id;obj.nom=ele.nom;return obj;});
		return (artiste);
	}
	else{
		throw Error("Erreur recherche");
	}
};

exports.getArtisteById = function(id){
	let artiste = mongoose.model('Artiste');
	return artiste.findOne({'_id' : id});
};

exports.getAlbumById = function(id){
	let artiste = mongoose.model('Artiste');
	return artiste.findOne({'albums._id' : id});
};

exports.getArtisteHavingAlbumWithId = function(id){
	let artiste = mongoose.model('Artiste');
	return artiste.findOne({'albums._id' : id});
};

exports.formatageArtistePourEnvoi = function(artiste){
	if(artiste){
		let artisteRenvoi = {};
		artisteRenvoi.albums = artiste.albums;
		artisteRenvoi.dateCreation = artiste.dateCreation;
		artisteRenvoi.dataFin = artiste.dateFin;
		artisteRenvoi.nom = artiste.nom;
		artisteRenvoi.biographie = artiste.biographie;
		artisteRenvoi._id = artiste._id;
		if(artisteRenvoi.albums && artisteRenvoi.albums.length>0){
			let albums = artisteRenvoi.albums.map(ele=>exports.formatageBlocAlbumPourEnvoi(artisteRenvoi,ele._id.toString()));
			artisteRenvoi.albums = albums.map(ele=>{ele.musiques = undefined; return ele;});
			artisteRenvoi.note = albums.filter(ele=>ele.note!==undefined);
			if(artisteRenvoi.note && artisteRenvoi.note.length>0){
				artisteRenvoi.note=artisteRenvoi.note.reduce((prev,ele)=>prev+ele.note,0)/artisteRenvoi.note.length;
			}
			else{
				artisteRenvoi.note = undefined;
			}
		}
		return artisteRenvoi;
	}
	else{
		throw Error("Aucun artiste trouvé");
	}
}

exports.formatageBlocAlbumPourEnvoi = function(artiste,id){
		if(artiste){
				let album = artiste.albums.filter(album=>album._id.toString()===id);
				album = album.map(alb=>{
						let retour = {};
						retour.musiques=alb.musiques;
						retour.genres=alb.genres;
						retour.datePublication=alb.datePublication;
						retour._id=alb._id;retour.nom = alb.nom;
						retour.nomGroupe = artiste.nom;
						retour.idGroupe=artiste._id;
						return retour;
					})[0];
				album.musiques = album.musiques.map(mus=>{
					let note = undefined;
					if(mus.notes.length>0){
						note = Math.floor(mus.notes.reduce((prev,ele)=>prev+ele.note,0)/mus.notes.length);
					}
					let returnObj = {};
					returnObj._id=mus._id;
					returnObj.titre=mus.titre;
					returnObj.note=note;
					return returnObj;
				});
				album.note = album.musiques.filter(ele=>ele.note!=undefined);
				if(album.note.length > 0){
					album.note = album.note.reduce((prev,ele)=>prev+ele.note,0)/album.note.length;
				}
				return album;
		}
		else{
			throw Error("Aucun album trouve");
		}
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
};

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
};

exports.cheminMusiquePourLecture = function(artiste,id){
	if(artiste){
		artiste=artiste[0].albums.reduce((prev,ele)=>prev.concat(ele),[])
        .reduce((prev,ele)=>prev.concat(ele.musiques),[])
        .filter(ele=>ele._id.toString()===id)[0].son;
		return artiste;
	}
	else{
		throw Error("Pas de musique retourn�e");
	}
};

exports.cheminCouvertureAlbum = function(artiste,id){
	if(artiste){
		artiste=artiste.albums.filter(ele=>ele._id.toString()===id)[0].couverture;
		return artiste;
	}else{
		throw Error("Pas d'album trouv�");
	}
};

exports.cheminCouvertureArtiste = function(artiste,id){
	if(artiste){
		artiste=artiste.image;
		return artiste;
	}else{
		throw Error("Pas d'artiste trouv�");
	}
};

exports.createPipeStreamFromPath = function(path){
	let fs = require('fs');
	//V�rifier si le chemin existe
	return fs.createReadStream(path);
};