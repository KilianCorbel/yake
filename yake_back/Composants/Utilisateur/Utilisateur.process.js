let express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('cookie-session');

let action = require('./Utilisateur.action.js');

exports.connect = function(username,password){
	return new Promise(function(resolve,reject){
		action.verifyUserAccountAccess(username,password)
		.then(data=>action.generateNewToken(data))
		.then(data=>resolve(data))
		.catch(err=>reject(err));
	});
};

exports.isTokenValid = function(token){
	return new Promise(function(resolve,reject){
		action.verifyIfTokenExist(token)
		.then(data=>action.verifyIfTokenIsExpired(data))
		.then(data=>resolve(data))
		.catch(err=>reject(err));
	});
};

exports.sendNote = function(token,idMusique,idAlbum,idArtiste,note){
	return new Promise(function(resolve,reject){
		exports.isTokenValid(token)
		.then(data=>action.sendNoteFromUser(data,idMusique,idAlbum,idArtiste,note))
		.then(data=>resolve(data))
		.catch(err=>reject(err));
	});
	
}