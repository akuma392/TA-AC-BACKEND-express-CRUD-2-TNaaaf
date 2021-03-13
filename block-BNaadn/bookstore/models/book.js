var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: String,
    pages: Number,
    publication: String,
    cover_image: {
      type: String,
      default: `https://static-exp1.licdn.com/sc/h/3m4tgpbdz7gbldapvl63mrnxz`,
    },
    category: [String],
    // author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    author: String,
  },
  { timestamps: true }
);

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;

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
