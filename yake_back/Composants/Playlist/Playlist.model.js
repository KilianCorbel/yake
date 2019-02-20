//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Artiste schema
let PlaylistSchema = new Schema({
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
});

let playlist = mongoose.model('Playlist', PlaylistSchema);
module.exports = playlist;