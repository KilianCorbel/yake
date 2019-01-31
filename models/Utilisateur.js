//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Artiste schema
let ArtisteSchema = new Schema({
    id : Number,
    pseudo : String,
    email : String,
    nom : String,
    prenom : String,
    password : String,
    dateCreation : Date
});

mongoose.model('Artiste', ArtisteSchema);