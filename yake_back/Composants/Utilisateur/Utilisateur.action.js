let express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('cookie-session');

const tokenExpiration = 2;	

exports.verifyUserAccountAccess = function(username,password){
	let user = mongoose.model('Utilisateur');
	//let u = new user({pseudo : username,password : password});
	//u.save();
	return user.findOne({pseudo : username, password : password});
}

exports.generateNewToken = function(data){
	return new Promise(function(resolve,reject){
		if(data.token === undefined || data.dateGenerationToken.setDate(data.dateGenerationToken.getDate()+tokenExpiration) < new Date()){
			let token = (require('uuid/v1'))();
			console.log(token);
			console.log(data);
			data.token = token;
			data.dateGenerationToken = new Date();
			data.save();
		}
		resolve({pseudo: data.pseudo,token : data.token });
	});
}

exports.verifyIfTokenExist = function(token){
	let user = mongoose.model('Utilisateur');
	return user.findOne({token : token});
};

exports.verifyIfTokenIsExpired = function(user){
	return new Promise(function(resolve,reject){
	if(user === undefined){
		reject('Utilisateur non trouve');
	}
	if(user.dateGenerationToken.setDate(user.dateGenerationToken.getDate()+tokenExpiration)<new Date())
		reject('Token is expired');
	resolve({id : user._id, pseudo : user.pseudo,token : user.token});
	});
};

exports.sendNoteFromUser = function(user,id,idAlbum,idArtiste,note){
	return new Promise(function(resolve,reject){
		if(user !== undefined){
			let artiste = mongoose.model('Artiste');
			artiste.findOne({_id : idArtiste})
			.then(data=>{
					modifiedData = data.albums.map(album=>{
						if(album._id==idAlbum)
							album.musiques = album.musiques.map(musique=>{
								if(musique._id==id){
									if(musique.notes !== undefined){
										musique.notes = musique.notes.filter(ele=>ele.userId!=user.id);
										musique.notes.push({userId : user.id,note : note});
									}
									else{
										musique.notes =[];
										musique.notes.push({userId : user.id,note : note});
									}
								}
								return musique;
							});
						return album;
					});
					data.albums = modifiedData;
					return data.save();
			})
			.then(data=>{data = data.albums.filter(ele=>ele._id==idAlbum);
						if(data !== undefined)
							data = data[0].musiques.filter(ele=>ele._id==id);
						if(data != undefined)
							data=data[0].notes.reduce((prev,ele)=>prev+ele.note,0)/data[0].notes.length;
						console.log(data);
						resolve({note:data});
				}
			)
			.catch(err=>{console.log(err);reject(err);});
		}
		else{
			reject("Utilisateur non existant");
		}
	});
};