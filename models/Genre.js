//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Musique schema
let GenreSchema = new Schema({
    id : Number,
    libelle : String
});

let genre = mongoose.model('Genre', GenreSchema);
module.exports = genre;