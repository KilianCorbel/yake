//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Artiste schema
let PlaylistSchema = new Schema({
    id : Number,
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
            titre : String,
            note : Number
        }
    ]
});

let playlist = mongoose.model('Playlist', PlaylistSchema);
module.exports = playlist;