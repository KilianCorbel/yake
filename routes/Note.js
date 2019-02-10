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
require('../models/Note');

lienErreur = '/error';
lienAll = '/note/';
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
        res.render(pageNote, notes);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let note = mongoose.model('Note');
    let newNote = new Note(req.body);
    newNote.id = newNote._id;

    newNote.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Note').updateOne({id : req.body.id}, {$set : req.body}, (err, updatedNote)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let note = mongoose.model('Note');
    note.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Note').findOne({id : req.params.id}).then((note)=>{
        if(note){
            res.render(pageBatiment, note);
        }else{
            res.status(404).json({message : "404 not found"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;