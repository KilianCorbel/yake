//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

// ---- Musique schema
let NoteSchema = new Schema({
    id : Number,
    note : Number
});

mongoose.model('Note', NoteSchema);