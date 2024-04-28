const {
  addBooks,
  getAllBooks,
  getBooksById,
  updateBooksById,
  deleteBooksById,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBooks,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBooksById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBooksById,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooksById,
  },
];

module.exports = routes;