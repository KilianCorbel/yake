//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Artiste schema
let ArtisteSchema = new Schema({
    id: Number,
    nom : String,
    dateCreation : Date,
    dateFin : Date,
    biographie : String,
    image : String
});

let artiste = mongoose.model('Artiste', ArtisteSchema);
module.exports = artiste;