// *** Include Modules: npm (mongoose)
const mongoose = require("mongoose");

// Set reference to Schema constructor and create new Book schema object
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authors: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

// // Test schema
// const BookSchema = new Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   synopsis: String,
//   date: { type: Date, default: Date.now }
// });

// Create model from schema
const Book = mongoose.model("Book", BookSchema);

// Export model
module.exports = Book;
