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
require('../models/Note');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/note';
lienModifier = '/note/:id';
lienSupprimer = '/note/:id';
lienGet = '/note/:id';

// routes vers le front react
pageErreur ='';
pageNote = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let note = mongoose.model('Note');
    note.find().then((notes)=>{
        res.send(notes);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let note = mongoose.model('Note');
    let newNote = new mongoose.Schema(req.body);
    newNote.id = newNote._id;

    newNote.save().then(()=>{
        res.send(newNote);
    },(err)=>{
        res.send(err);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Note').updateOne({_id : req.body.id}, {$set : req.body}, (err, updatedNote)=>{
       if(err){
            res.send(err);
       }else{
            res.send(updatedNote);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let note = mongoose.model('Note');
    note.find({_id : req.params.id}).deleteOne().then(()=>{
        res.send(note);
    },(err)=>{
        res.send(err);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Note').findOne({_id : req.params.id}).then((note)=>{
        if(note){
            res.send(note);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.send(err);
    });
});

module.exports = app;