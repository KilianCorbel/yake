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

// app.get(, function(req, res) {
// })