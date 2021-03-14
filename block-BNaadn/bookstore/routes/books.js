var express = require('express');
const Author = require('../models/author');
var router = express.Router();
var Book = require('../models/book');

/* GET users listing. */
// router.get('/', (req, res) => {
//   Book.find({}, (err, books, next) => {
//     if (err) return next(err);
//     res.render('books', { books: books });
//   });
// });

router.get('/', (req, res) => {
  Book.find({})
    .populate('author')
    .exec((err, books) => {
      if (err) next(err);
      res.render('books', { books: books });
    });
});

router.get('/create', (req, res) => {
  res.render('createBooks');
});

router.post('/', (req, res, next) => {
  console.log(req.body, 'form data');
  let book = {
    title: req.body.title,
    summary: req.body.summary,
    pages: req.body.pages,
    cover_image: req.body.cover_image,
    category: req.body.category,
  };
  let author = {
    name: req.body.author,
    email: req.body.email,
    country: req.body.country,
  };
  Author.create(author, (err, author) => {
    if (err) next(err);

    book.author = author._id;
    console.log(book, '-----------');
    Book.create(book, (err, book) => {
      if (err) return next(err);
      console.log(book, 'book after author******');
      res.redirect('/books');
    });
  });
  console.log(book, 'book after author');
});

// router.get('/:id', (req, res, next) => {
//   let id = req.params.id;
//   Book.findById(id, (err, book) => {
//     if (err) next(err);
//     res.render('singleBook', { book: book });
//   });
// });

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Book.findById(id)
    .populate('author')
    .exec((err, book) => {
      console.log(book, '*******');
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
