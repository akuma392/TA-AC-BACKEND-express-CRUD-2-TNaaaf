var express = require('express');
var router = express.Router();
var Book = require('../models/book');

/* GET users listing. */
router.get('/', (req, res) => {
  Book.find({}, (err, books, next) => {
    console.log(err, books);
    if (err) return next(err);
    res.render('books', { books: books });
  });
});
router.get('/create', (req, res) => {
  res.render('createBooks');
});

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, user) => {
    console.log(err, req.body);
    if (err) return next(err);
    res.redirect('/books');
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) next(err);
    res.render('singleBook', { book: book });
  });
});

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) next(err);
    res.render('updatebook', { book: book });
  });
});

router.post('/:id/edit', (req, res, next) => {
  let id = req.params.id;

  console.log(req.body);
  Book.findByIdAndUpdate(id, req.body, { new: true }, (err, updatedbook) => {
    if (err) next(err);
    res.redirect('/books/' + id);
  });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndDelete(id, (err, deletedBook) => {
    if (err) next(err);
    res.redirect('/books');
  });
});

module.exports = router;
