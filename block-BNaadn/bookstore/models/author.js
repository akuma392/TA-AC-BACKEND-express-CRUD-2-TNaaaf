var mongoose = require('mongoose');
const { schema } = require('./book');

var Schema = mongoose.Schema;

var authorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: String,
    country: String,
    booksId: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  },
  { timestamps: true }
);

var Author = mongoose.model('Author', authorSchema);

module.exports = Author;

// 1. Each book can have fields:-

// - title
// - summary
// - pages
// - publication
// - cover_image

// 2. Each book must belong to one or more category like:

// - fiction
// - adventure
// - technology
// - motivation

// 3. Each book must have an author

// - author will have `name`, `email`, `country`
