let express = require('express'),
    app = express(),
    router = express.Router(),
    session = require('cookie-session');

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({secret: 'todotopsecret'}))

// -- Load model needed for the project
require('../models/Utilisateur');

lienErreur = '/error';
lienAll = '/user/';
lienAjouter = '/user';
lienModifier = '/user/:id';
lienSupprimer = '/user/:id';
lienGet = '/user/:id';

// routes vers le front react
pageErreur ='';
pageUser = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let user = mongoose.model('Utilisateur');
    user.find().then((users)=>{
        res.render(pageUser, users);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let user = mongoose.model('Utilisateur');
    let newUser = new Utilisateur(req.body);
    newUser.id = newUser._id;

    newUser.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Utilisateur').updateOne({id : req.body.id}, {$set : req.body}, (err, updatedUser)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let album = mongoose.model('Album');
    album.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Album').findOne({id : req.params.id}).then((album)=>{
        if(album){
            res.render(pageBatiment, album);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;