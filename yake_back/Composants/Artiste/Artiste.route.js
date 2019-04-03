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
    let artiste = mongoose.model('Artiste');

    artiste.find({'albums._id' : req.params.id}).then((art)=>{
        if(art){
            art = art.map(arti=>{arti.albums=arti.albums.filter(album=>album._id.toString()===req.params.id);return arti;});
			art = art.map(arti=>arti.albums.map(alb=>{let retour = {};retour.musiques=alb.musiques;retour.genres=alb.genres;retour.datePublication=alb.datePublication;retour._id=alb._id;retour.nom = alb.nom;retour.nomGroupe = arti.nom;retour.idGroupe=arti._id;return retour}).reduce((prev,ele)=>prev.concat(ele),[])).reduce((prev,ele)=>prev.concat(ele),[])[0];
            res.send(art);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

// -- GET album/:name
// Rajouter tolower / toupper pour les regexp


app.get(getAlbumByName, function(req, res) {
    let artiste = mongoose.model('Artiste');
	let genreFilter = new RegExp('^.*$');
	if(req.query.genres !== undefined && req.query.genres.length>0){
		genreFilter=req.query.genres.split(',').map(ele=>new RegExp('^'+ele+'$','i'));
	}	
    artiste.find({'albums.nom' : new RegExp('^.*'+req.params.name+'.*$', "ig"),'albums.genres':{$in : genreFilter}}).then((art)=>{
		if(art){
			let genre = undefined;
			if(req.query.genres !== undefined && req.query.genres.length>0){
				genre=req.query.genres.split(',').map(ele=>ele.toLowerCase());
			}
			art = art.map(arti=>{arti.albums=arti.albums.filter(album=>{if(genre===undefined)return true;return containsAtLeastOne(album.genres,genre);}).filter(album=>album.nom.toLowerCase().includes(req.params.name.toLowerCase()));return arti;});
			art = art.map(arti=>arti.albums.map(alb=>{let retour = {};retour.musiques=alb.musiques;retour._id=alb._id;retour.nom = alb.nom;retour.nomGroupe = arti.nom;retour.idGroupe=arti._id;return retour}).reduce((prev,ele)=>prev.concat(ele),[])).reduce((prev,ele)=>prev.concat(ele),[]);
            art = art.map(ele=>{let obj = {}; obj._id=ele._id;obj.nom=ele.nom;return obj;});
			res.send(art);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

// -- GET musique/:id
app.get(getMusiqueById, function(req, res) {
    let artiste = mongoose.model('Artiste')

    artiste.find({'albums.musiques._id' : req.params.id}, 'albums.musiques').then((musique)=>{
        if(musique){
            musique=musique[0].albums.reduce((prev,ele)=>prev.concat(ele),[])
            .reduce((prev,ele)=>prev.concat(ele.musiques),[])
            .filter(ele=>ele._id.toString()===req.params.id)[0];
            
            res.send(musique);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

function containsAtLeastOne(tab,referenceTab){
	return tab.reduce((accu,ele)=>{if(accu)return true;return referenceTab.includes(ele.toLowerCase());},false);
}

// -- GET musique/:title
app.get(getMusiqueByTitle, function(req, res) {
    let artiste = mongoose.model('Artiste');
	let genreFilter = new RegExp('^.*$');
	if(req.query.genres !== undefined && req.query.genres.length>0){
		if(req.query.genres){
			genreFilter=req.query.genres.split(',');
			genreFilter = genreFilter.map(ele=>new RegExp('^'+ele+'$','i'));
		}
	}	
    artiste.find({'albums.musiques.titre' : new RegExp('^.*'+req.params.title+'.*$', "ig"),'albums.genres':{$in : genreFilter}}).then((art)=>{
		let genre = undefined;
		if(req.query.genres !== undefined && req.query.genres.length>0){
			genre=req.query.genres.split(',').map(ele=>ele.toLowerCase());
		}
        if(art){
			console.log(art);
			albums = art.map(arti=>arti.albums.map(alb=>{
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
				musicObj.idGoupe = alb.idGroupe;
				musicObj.titre=mus.titre;
                musicObj._id=mus._id;
				return musicObj;
			}).reduce((prev,ele)=>prev.concat(ele),[])).reduce((prev,ele)=>prev.concat(ele),[]).filter(ele=>{if(genre===undefined)return true;return containsAtLeastOne(ele.genres,genre)}).filter(ele=>ele.titre.toLowerCase().includes(req.params.title.toLowerCase()));
			
			//res.send(art);
			/*art=art.filter(ele=>ele.albums.filter(album=>album.musiques.filter(mus=>mus.titre.includes(req.params.title))).length>0);
			art=art.map(arti=>{arti.albums=arti.albums.filter(album=>album.musiques.filter(mus=>mus.titre.includes(req.params.title))>0);return arti;});
			art.map(arti=>arti.albums.map(album=>{album.musiques=album.musiques.filter(mus=>mus.titre===req.params.title);return album;}));*/
            res.send(mus);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

// -- CREATE
app.post(postArtiste, function (req, res) {
    let Artiste = mongoose.model('Artiste');
	let buf = Buffer.from(req.body.image.data);
	let path = require('path');
	fs.writeFile(`${path.resolve('../../Data/artiste')}/${req.body.nom}`,buf,(err)=>{
		if(err)
			return console.log(err);
		console.log("Fichier sauvĂ©");
	});
	req.body.fileName=undefined;
	req.body.image=path.resolve('../../Data/artiste')+"/"+req.body.nom;
    let newArtiste = new Artiste(req.body);
    //newArtiste.id = newArtiste._id;
    newArtiste.save().then(()=>{
        res.send(newArtiste);
    })
    .catch(err=>console.log(err));
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
app.get(readMusique,function (req,res){
	let artiste = mongoose.model('Artiste');
	artiste.find({'albums.musiques._id' : req.params.id}, 'albums.musiques').then((musique)=>{
        if(musique){
			let fs = require('fs');
            musique=musique[0].albums.reduce((prev,ele)=>prev.concat(ele),[])
            .reduce((prev,ele)=>prev.concat(ele.musiques),[])
            .filter(ele=>ele._id.toString()===req.params.id)[0].son;
			let rstream = fs.createReadStream(musique);
			rstream.pipe(res);
			//res.send(musique);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});


//READ albumCover
app.get(getAlbumCover,function (req,res){
	let artiste = mongoose.model('Artiste');
	artiste.find({'albums._id' : req.params.id}, 'albums').then((album)=>{
        if(album){
			let fs = require('fs');
			album=album[0].albums.filter(ele=>ele._id.toString()===req.params.id)[0].couverture;
			if(album!==''){
				let rstream = fs.createReadStream(album);
				rstream.pipe(res);
			}
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

//READ ArtisteCover
app.get(getArtisteCover,function (req,res){
	let artiste = mongoose.model('Artiste');
	artiste.find({'_id' : req.params.id}).then((art)=>{
        if(art){
			let fs = require('fs');
			art=art[0].image;
			if(art.length>0){
				let rstream = fs.createReadStream(art);
				rstream.pipe(res);
			}
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});


// -- GET artiste/:id
app.get(getArtisteById, function (req, res) {
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