//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Musique schema
let MusiqueSchema = new Schema({
    titre : String,
    son : Buffer,
    note : Number
})

// ---- Genre schema
let GenreSchema = new Schema({
    nom : String
});

// ---- Album schema
let AlbumSchema = new Schema({
    nom : String,
    couverture : String,
    datePublication : Date,
    genres : [GenreSchema],
    musiques : [MusiqueSchema]
});

// ---- Artiste schema
let ArtisteSchema = new Schema({
    nom : String,
    dateCreation : Date,
    dateFin : Date,
    biographie : String,
    image : String,
    albums : [AlbumSchema]
});

let artiste = mongoose.model('Artiste', ArtisteSchema);
let album = mongoose.model('Album', AlbumSchema);
let musique = mongoose.model('Musique', MusiqueSchema);
module.exports = artiste, album, musique;