//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Artiste schema
let PlaylistSchema = new Schema({
    id : Number,
    nom : String,
    image : String,
    description : String,
    privee : Boolean
});

let playlist = mongoose.model('Playlist', PlaylistSchema);
module.exports = playlist;