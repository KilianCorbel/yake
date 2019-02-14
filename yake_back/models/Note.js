//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Musique schema
let NoteSchema = new Schema({
    id : Number,
    note : Number
});

let note = mongoose.model('Note', NoteSchema);
module.exports = note;