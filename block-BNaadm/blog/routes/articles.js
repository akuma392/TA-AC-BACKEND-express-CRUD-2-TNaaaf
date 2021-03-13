var express = require('express');
var router = express.Router();

var Article = require('../models/article');
var Comment = require('../models/comment');

router.get('/', (req, res, next) => {
  Article.find({}, (err, articles, next) => {
    console.log(err, articles);
    if (err) return next(err);
    res.render('articles', { articles: articles });
  });
});

router.get('/new', (req, res, next) => {
  res.render('createArticle');
});

router.post('/', (req, res, next) => {
  Article.create(req.body, (err, user) => {
    console.log(err, req.body);
    if (err) return next(err);
    res.redirect('/articles');
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    Comment.find({ articleId: id }, (err, comment) => {
      if (err) next(err);
      res.render('singleArticle', { article: article, comment: comment });
    });
  });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndDelete(id, (err) => {
    if (err) next(err);
    Comment.deleteMany({ articleId: id }, (err, info) => {
      if (err) next(err);
      res.redirect('/articles/' + info.articleId);
    });
  });
});

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) next(err);
    res.render('updateArticle', { article: article });
  });
});

router.post('/:id/edit', (req, res) => {
  let id = req.params.id;
  console.log(req.body);
  Article.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (err, updatedArticle) => {
      if (err) next(err);
      res.redirect('/articles/' + id);
    }
  );
});

router.get('/:id/like', (req, res, next) => {
  let id = req.params.id;
  console.log(req);
  Article.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    (err, updatedArticle) => {
      // if (err) next(err);
      res.redirect('/articles/' + id);
    }
  );
});

router.get('/:id/dislike', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(
    id,
    { $inc: { likes: -1 } },
    (err, updateArticle) => {
      if (err) next(err);
      res.redirect('/articles/' + id);
    }
  );
});

router.post('/:id/comments', (req, res, next) => {
  var id = req.params.id;
  console.log(req.body);
  console.log('hello comment');
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) next(err);
    res.redirect('/articles/' + id);
  });
});
module.exports = router;
