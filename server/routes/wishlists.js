const sequenceGenerator = require('./sequenceGenerator');
const Wishlist = require('../models/wishlist');

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    Wishlist.find()
        .then(wishlist => {
            res
                .status(200)
                .json({
                    message: 'Wishlist fetched successfully!',
                    wishlist: wishlist
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occured',
                error: error
            });
        });
 });

router.post('/', (req, res, next) => {
    const maxWishlistId = sequenceGenerator.nextId("wishlist");
  
    const wishlist = new Wishlist({
        id: maxWishlistId,
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        link: req.body.link
    });
  
    wishlist.save()
        .then(createdWishlist => {
            res.status(201).json({
                message: 'Wishlist book added successfully',
                wishlist: createdWishlist
            });
        })
      .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    Wishlist.findOne({ id: req.params.id })
        .then(wishlist => {
            wishlist.title = req.body.title;
            wishlist.author = req.body.author;
            wishlist.imageUrl = req.body.imageUrl;
            wishlist.link = req.body.link;
    
            Wishlist.updateOne({ id: req.params.id }, wishlist)
                .then(result => {
                    res.status(204).json({
                    message: 'Wishlist book updated successfully'
                    })
                })
                .catch(error => {
                    res.status(500).json({
                    message: 'An error occurred',
                    error: error
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Wishlist book not found.',
                error: { wishlist: 'Wishlist book not found'}
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Wishlist.findOne({ id: req.params.id })
      .then(wishlist => {
        Wishlist.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Wishlist book deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Wishlist book not found.',
          error: { wishlist: 'Wishlist not found'}
        });
      });
});

module.exports = router;