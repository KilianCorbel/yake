//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Schema
let UtilisateurSchema = new Schema({
    id : Number,
    pseudo : String,
    email : String,
    nom : String,
    prenom : String,
    password : String,
    dateCreation : Date
});

let user = mongoose.model('Utilisateur', UtilisateurSchema);
module.exports = user;