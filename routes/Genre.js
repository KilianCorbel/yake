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
require('../models/Genre');

lienErreur = '/error';
lienAll = '/genre/';
lienAjouter = '/genre';
lienModifier = '/genre/:id';
lienSupprimer = '/genre/:id';
lienGet = '/genre/:id';

// routes vers le front react
pageErreur ='';
pageGenre = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let genre = mongoose.model('Genre');
    genre.find().then((genres)=>{
        res.render(pageGenre, genres);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let genre = mongoose.model('Genre');
    let newGenre = new Genre(req.body);
    newGenre.id = newGenre._id;

    newGenre.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Genre').updateOne({id : req.body.id}, {$set : req.body}, (err, updatedGenre)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let genre = mongoose.model('Genre');
    genre.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Genre').findOne({id : req.params.id}).then((genre)=>{
        if(genre){
            res.render(pageGenre, genre);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;