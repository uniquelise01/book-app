var Sequence = require('../models/sequence');

var maxLibraryId;
var maxWishlistId;
var maxBookclubId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxLibraryId = sequence.maxLibraryId;
      maxWishlistId = sequence.maxWishlistId;
      maxBookclubId = sequence.maxBookclubId;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'library':
      maxLibraryId++;
      updateObject = {maxLibraryId: maxLibraryId};
      nextId = maxLibraryId;
      break;
    case 'wishlist':
      maxWishlistId++;
      updateObject = {maxWishlistId: maxWishlistId};
      nextId = maxWishlistId;
      break;
    case 'bookclub':
      maxBookclubId++;
      updateObject = {maxBookclubId: maxBookclubId};
      nextId = maxBookclubId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
