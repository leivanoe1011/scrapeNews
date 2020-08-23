

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({

    // `title` is of type String
    noteContent: String,
    article: {type: Schema.Types.ObjectId, ref:"Article"}
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;

