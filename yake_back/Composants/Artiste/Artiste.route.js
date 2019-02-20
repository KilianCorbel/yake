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
const getArtisteById = '/id/:id';
const getArtisteByName = '/name/:name';
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
    let artiste = mongoose.model('Artiste');
    artiste.find({'nom' : new RegExp('^.*'+req.params.name+'.*$', "i")}).then((artistes)=>{
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
		});return ele;});
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

    artiste.find({'albums.nom' : new RegExp('^.*'+req.params.name+'.*$', "ig")}).then((art)=>{
        if(art){
			art = art.map(arti=>{arti.albums=arti.albums.filter(album=>album.nom.toLowerCase().includes(req.params.name.toLowerCase()));return arti;});
			art = art.map(arti=>arti.albums.map(alb=>{let retour = {};retour.musiques=alb.musiques;retour._id=alb._id;retour.nom = alb.nom;retour.nomGroupe = arti.nom;retour.idGroupe=arti._id;return retour}).reduce((prev,ele)=>prev.concat(ele),[])).reduce((prev,ele)=>prev.concat(ele),[]);
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
    let artiste = mongoose.model('Artiste');

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

// -- GET musique/:title
app.get(getMusiqueByTitle, function(req, res) {
    let artiste = mongoose.model('Artiste');

    artiste.find({'albums.musiques.titre' : new RegExp('^.*'+req.params.title+'.*$', "ig")}).then((art)=>{
        if(art){
			console.log(art);
			albums = art.map(arti=>arti.albums.map(alb=>{
                let retour = {};
                retour.musiques=alb.musiques;
                retour._id=alb._id;
                retour.nom = alb.nom;
                retour.nomGroupe = arti.nom;
                retour.idGroupe=arti._id;
                return retour})
                .reduce((prev,ele)=>prev.concat(ele),[]))
                .reduce((prev,ele)=>prev.concat(ele),[]);
            mus = albums.map(alb=>alb.musiques.map(mus=>{
				let musicObj={};
				musicObj.nomGroupe=alb.nomGroupe;
				musicObj.idAlbum=alb._id;
				musicObj.nomAlbum=alb.nom;
				musicObj.idGoupe = alb.idGroupe;
				musicObj.titre=mus.titre;
                musicObj._id=mus._id;
				return musicObj;
			}).reduce((prev,ele)=>prev.concat(ele),[])).reduce((prev,ele)=>prev.concat(ele),[]).filter(ele=>ele.titre.toLowerCase().includes(req.params.title.toLowerCase()));
			
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