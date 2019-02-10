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
require('../models/Artiste');

lienErreur = '/error';
lienAll = '/artiste/';
lienAjouter = '/artiste';
lienModifier = '/artiste/:id';
lienSupprimer = '/artiste/:id';
lienGet = '/artiste/:id';

// routes vers le front react
pageErreur ='';
pageArtiste = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let artiste = mongoose.model('Artiste');
    artiste.find().then((artistes)=>{
        res.render(pageArtiste, artistes);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let artiste = mongoose.model('Artiste');
    let newArtiste = new Artiste(req.body);
    newArtiste.id = newArtiste._id;

    newArtiste.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Artiste').updateOne({id : req.body.id}, {$set : req.body}, (err, updatedArtiste)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let artiste = mongoose.model('Artiste');
    artiste.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Artiste').findOne({id : req.params.id}).then((artiste)=>{
        if(artiste){
            res.render(pageArtiste, artiste);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;