//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Artiste schema
let ArtisteSchema = new Schema({
    id: Number,
    nom : string,
    dateCreation : Date,
    dateFin : Date,
    biographie : String,
    image : String
});

mongoose.model('Artiste', ArtisteSchema);