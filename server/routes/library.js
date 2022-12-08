const sequenceGenerator = require('./sequenceGenerator');
const Libraries = require('../models/library');

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    Libraries.find()
        .populate('series')
        .then(library => {
            console.log(library);
            res
                .status(200)
                .json({
                    message: 'Library fetched successfully!',
                    library: library
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
    Libraries.findOne({
        "id": req.params.id
    })
        .populate('series')
        .then(library => {
            console.log(library);
            res
                .status(200)
                .json({
                    message: 'Library fetched successfully!',
                    library: library
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
    const maxLibraryId = sequenceGenerator.nextId("library");
  
    const library = new Library({
        id: maxLibraryId,
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        link: req.body.link,
        published: req.body.published,
        readlist: req.body.readlist,
        series: req.body.series
    });
  
    library.save()
        .then(createdLibrary => {
            res.status(201).json({
                message: 'Library book added successfully',
                library: createdLibrary
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
    Library.findOne({ id: req.params.id })
        .then(library => {
            library.title = req.body.title;
            library.author = req.body.author;
            library.imageUrl = req.body.imageUrl;
            library.link = req.body.link;
            library.published = req.body.published;
            library.readlist = req.body.readlist;
            library.series = req.body.series;
    
            Library.updateOne({ id: req.params.id }, library)
                .then(result => {
                    res.status(204).json({
                    message: 'Library book updated successfully'
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
                message: 'Library book not found.',
                error: { library: 'Library book not found'}
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Library.findOne({ id: req.params.id })
      .then(library => {
        Library.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Library book deleted successfully"
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
          message: 'Library book not found.',
          error: { library: 'Library not found'}
        });
      });
});

module.exports = router;