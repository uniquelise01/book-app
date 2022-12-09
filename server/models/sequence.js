const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   maxLibraryId: { type: Number, required: true },
   maxWishlistId: { type: Number, required: true },
   maxBookclubId: { type: Number, required: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema);