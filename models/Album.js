//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Album schema
let AlbumSchema = new Schema({
    id : Number,
    nom : string,
    couverture : string,
    datePublication : Date
});

mongoose.model('Album', AlbumSchema);