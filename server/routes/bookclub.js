const sequenceGenerator = require('./sequenceGenerator');
const Bookclub = require('../models/bookclub');

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    Bookclub.find()
        .populate('group')
        .then(bookclub => {
            res
                .status(200)
                .json({
                    message: 'Bookclub contacts fetched successfully!',
                    bookclub: bookclub
                });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occured',
                error: error
            });
        });
 });

 router.get('/:id', (req, res, next) => {
    Bookclub.findOne({
        "id": req.params.id
    })
        .populate('group')
        .then(bookclub => {
            res
                .status(200)
                .json({
                    message: 'Bookclub contact fetched successfully!',
                    bookclub: bookclub
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
    const maxBookclubId = sequenceGenerator.nextId("bookclub");
  
    const bookclub = new Bookclub({
        id: maxBookclubId,
        name: req.body.name,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        favBooks: req.body.favBooks
    });
  
    bookclub.save()
        .then(createdBookclub => {
            res.status(201).json({
                message: 'Bookclub contact added successfully',
                bookclub: createdBookclub
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
    Bookclub.findOne({ id: req.params.id })
        .then(bookclub => {
            bookclub.name = req.body.name;
            bookclub.phone = req.body.phone;
            bookclub.imageUrl = req.body.imageUrl;
            bookclub.favBooks = req.body.favBooks;
    
            Bookclub.updateOne({ id: req.params.id }, bookclub)
                .then(result => {
                    res.status(204).json({
                    message: 'Bookclub contact updated successfully'
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
                message: 'Bookclub contact not found.',
                error: { bookclub: 'Bookclub contact not found'}
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Bookclub.findOne({ id: req.params.id })
      .then(bookclub => {
        Bookclub.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Bookclub contact deleted successfully"
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
          message: 'Bookclub contact not found.',
          error: { bookclub: 'Bookclub contact not found'}
        });
      });
  });

module.exports = router;