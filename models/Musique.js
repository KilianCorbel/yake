//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Musique schema
let MusiqueSchema = new Schema({
    id : Number,
    titre : String,
    datePublication : Date
});

let musique = mongoose.model('Musique', MusiqueSchema);
module.exports = musique;