var express = require('express');
var router = express.Router();
var Book = require('../models/book');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/name', (req, res, next) => {
  Book.find({})
    .sort({ title: 1 })
    .populate('author')
    .exec((err, books) => {
      if (err) next(err);
      res.render('books', { books: books });
    });
});
// router.get('/date', (req, res, next) => {
//   Book.find({}).populate("author")
//     .sort({ author.name: 1 })
//     .exec((err, books) => {
//       if (err) next(err);
//       res.render('books', { books: books });
//     });
// });
router.get('/category', (req, res, next) => {
  Book.find({})
    .sort({ category: 1 })
    .populate('author')
    .exec((err, books) => {
      if (err) next(err);
      res.render('books', { books: books });
    });
});
module.exports = router;
