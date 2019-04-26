//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;
let Playlist = mongoose.model('Playlist');
// ---- Schema
let UtilisateurSchema = new Schema({
    id : Number,
    pseudo : String,
    email : String,
    nom : String,
    prenom : String,
    password : String,
    dateCreation :{ type : Date, default : new Date()},
	rang : String,
	token : String,
	dateGenerationToken : Date,
    playlists : [ {
    nom : String,
    image : String,
    description : String,
    privee : Boolean,
    utilisateur : {
        pseudo : String,
        email : String,
        nom : String,
        prenom : String,
        dateCreation : Date
    },
    musiques : [
        {
			id: String,
            titre : String,
			idAlbum : String,
			idArtiste: String,
			nomAlbum : String,
			nomGroupe:String
        }
    ]
}]
});

let user = mongoose.model('Utilisateur', UtilisateurSchema);
module.exports = user;