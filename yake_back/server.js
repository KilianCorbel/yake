// ---- Dependencies
let express = require('express'),
    app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let test = require('./Composants/Artiste/Artiste.model.js');
let playlist = require('./Composants/Playlist/Playlist.model');
// ---- Body parser
let urlencodedParser = bodyParser.urlencoded({
    extended: true,
});
let fs = require('fs');
app.use(urlencodedParser);
app.use(bodyParser.json());

// ---- Connect to database
let database = mongoose.connect("mongodb://localhost:27017/yake",{
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while connecting to database');
    console.log(e);
});

// let newPlaylist = new playlist({	
// 	nom : "Playlist Perso",
// 	image: "null.png",
// 	description : "Playlist test",
// 	privee : true,
// 	utilisateur : {
// 			pseudo : "karmapolice",
// 			email : "karma.police@gmail.com",
// 			nom : "karma",
// 			prenom: "police",
// 			dateCreation : "09-02-2019"
// 	},
// 	musiques : [
// 		{
// 			titre : "Resistance",
// 			note : 4.7
// 		},
// 		{
// 			titre : "I Belong To You",
// 			note : 4.9
// 		},
// 		{
// 			titre : "Space Dementia",
// 			note : 4.9
// 		},
// 		{
// 			titre : "Wish You Were Here",
// 			note : 4.8
// 		},
// 		{
// 			titre : "Time",
// 			note : 4.8
// 		}
// 	]    
// });

// let newPlaylist2 = new playlist({
// 	nom : "Soirées",
// 	image: "null.png",
// 	description : "Ma playlist pour soirées",
// 	privee : false,
// 	utilisateur : {
// 		pseudo : "karmapolice"
// 	},
// 	musiques : [
// 		{
// 			titre : "Resistance",
// 			note : 4.7
// 		},
// 		{
// 			titre : "Unnatural Selection",
// 			note : 4
// 		},
// 		{
// 			titre : "Space Dementia",
// 			note : 4.9
// 		},
// 		{
// 			titre : "Plug In Baby",
// 			note : 4.8
// 		},
// 		{
// 			titre : "Feeling Good",
// 			note : 5
// 		}
// 	]
// });

// newPlaylist.save().then(playlist => {
// 	console.log(playlist);
// })
// .catch(err => {
// 	console.error(err);
// })

// newPlaylist2.save().then(playlist => {
// 	console.log(playlist);
// })
// .catch(err => {
// 	console.error(err);
// })
/*
let testMusique1 = new test.Musique({titre:"Lullaby",note:5,son:'C:/Users/corme/Desktop/Lullaby - Nickelback.mp3'});
let testAlbum = new test.Album({nom:"Here And Now",couverture:'C:/Users/corme/Desktop/hereAndNow.jpg',musiques:[testMusique1]});
let testArtiste = new test.Artiste({nom:"Nickelback",biographie:"biographie",image:'C:/Users/corme/Desktop/hereAndNow.jpg',albums:[testAlbum]});
testArtiste.save().then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })*/
/*
let testMusique1 = new test.Musique({titre:"Believer",note:5,son:'C:/Users/corme/Desktop/04 Believer.mp3'});
	let testMusique2 = new test.Musique({titre:"Next To Me",note:5,son:'C:/Users/corme/Desktop/01 Next To Me.mp3'});
	let testAlbum = new test.Album({nom:"Evolve",couverture:'C:/Users/corme/Desktop/evolve.jpg',musiques:[testMusique1,testMusique2]});
	let testMusique3 = new test.Musique({titre:"Radioactive",note:5,son:'C:/Users/corme/Desktop/01 Radioactive.mp3'});
	let testAlbum2 = new test.Album({nom:"Night Vision",couverture:'C:/Users/corme/Desktop/nightVision.jpg',musiques:[testMusique3]});
	let testArtiste = new test.Artiste({nom:"Imagine Dragons",biographie:"Ceci est la biographie du groupe Imagine Dragon, groupe que j'affectionne tout particulièrement. Je ne sais pas quoi dire de plus sur eux alors veuillez vous contenter de ça",image:'C:/Users/corme/Desktop/imagineDragon.jpg',albums:[testAlbum,testAlbum2]});

testArtiste.save().then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })
*/
// ---- Define CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// ---- Define routes
app.use('/api/artistes', require('./Composants/Artiste/Artiste.route'));
app.use('/api/playlists', require('./Composants/Playlist/Playlist.route'));
// app.use('/api/users', require('./Composants/Utilisateur/Utilisateur.process'));

// ---- Start server
app.listen(8080, function(){
    console.info('HTTP server started on port 8080 \nConnect to http://localhost:8080/');
});