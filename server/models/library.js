const mongoose = require('mongoose');

const librarySchema = mongoose.Schema({
   id: { type: String, required: true },
   title: { type: String, required: true },
   author: { type: String, required: true },
   imageUrl: { type: String, required: false },
   link: { type: String, required: false },
   published: { type: String, required: false },
   readlist: { type: Boolean, required: true },
   series: [{ type: mongoose.Schema.Types.ObjectId, ref:'Book'}]
});

module.exports = mongoose.model('Library', librarySchema);