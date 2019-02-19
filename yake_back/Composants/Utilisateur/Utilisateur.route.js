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
require('./Utilisateur.model');

lienErreur = '/error';
lienAll = '/';
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
        res.send(users);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let user = mongoose.model('Utilisateur');
    let newUser = new mongoose.Schema(req.body);
    newUser.id = newUser._id;

    newUser.save().then(()=>{
        res.send(newUser);
    },(err)=>{
        res.send(err);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Utilisateur').updateOne({_id : req.body.id}, {$set : req.body}, (err, updatedUser)=>{
       if(err){
            res.send(err);
       }else{
            res.send(updatedUser);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let user = mongoose.model('Utilisateur');
    user.find({_id : req.params.id}).deleteOne().then(()=>{
        res.send(user);
    },(err)=>{
        res.send(err);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Utilisateur').findOne({_id : req.params.id}).then((user)=>{
        if(user){
            res.send(user);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

module.exports = app;