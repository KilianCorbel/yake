let express = require('express'),
    app = express(),
    router = express.Router();
    session = require('cookie-session');

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({secret: 'todotopsecret'}))

// -- Load model needed for the project
require('../models/Musique');

lienErreur = '/error';
lienAll = '/album/';
lienAjouter = '/album';
lienModifier = '/album/:id';
lienSupprimer = '/ablbum/:id';
lienGet = '/album/:id';

// routes vers le front react
pageErreur ='';
pageMusique = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let musique = mongoose.model('Musique');
    musique.find().then((musiques)=>{
        res.render(pageMusique, musiques);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let musique = mongoose.model('Musique');
    let newMusique = new Musique(req.body);
    newMusique.id = newMusique._id;

    newMusique.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Musique').updateOne({id : req.body.id}, {$set : req.body}, (err, updatedMusique)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let musique = mongoose.model('Musique');
    album.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Musique').findOne({id : req.params.id}).then((musique)=>{
        if(album){
            res.render(pageMusique, musique);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;