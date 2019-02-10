//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Album schema
let AlbumSchema = new Schema({
    id : Number,
    nom : String,
    couverture : String,
    datePublication : String
});


let album = mongoose.model('Album', AlbumSchema);
module.exports = album;