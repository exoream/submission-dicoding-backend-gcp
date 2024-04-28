const { nanoid } = require("nanoid");
const books = require("./books");
const { failResponse, successResponse, successWithData, successResponseWithData } = require("./response");

const addBooks = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // Cek apakah properti name ada dalam request body
  if (!name) {
    return h.response(failResponse("Gagal menambahkan buku. Mohon isi nama buku")).code(400);
  }

  // Cek readPage lebih besar dari pageCount
  if (readPage > pageCount) {
    return h.response(failResponse("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount")).code(400);
  }

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response(successResponseWithData("Buku berhasil ditambahkan", { bookId: id })).code(201);
  }

  return h.response(failResponse("Gagal menambahkan buku")).code(500);
};

const getAllBooks = (request, h) => {
  let filteredBooks = [...books];
  const { name: queryName, reading, finished } = request.query;

  // Filter berdasarkan nama
  if (queryName) {
    const name = queryName.toLowerCase();
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name));
  }

  // Filter berdasarkan status reading
  if (reading === '0' || reading === '1') {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }

  // Filter berdasarkan status finished
  if (finished === '0' || finished === '1') {
    const isFinished = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
  }

  const responseData = successWithData({
    books: filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher })),
  });

  return h.response(responseData).code(200);
};

const getBooksById = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    const responseData = successWithData({ book });
    return h.response(responseData).code(200);
  }

  return h.response(failResponse("Buku tidak ditemukan")).code(404);
};

const updateBooksById = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  // Cek apakah properti name ada dalam request body
  if (!name) {
    return h.response(failResponse("Gagal memperbarui buku. Mohon isi nama buku")).code(400);
  }

  // Cek readPage lebih besar dari pageCount
  if (readPage > pageCount) {
    return h.response(failResponse("Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount")).code(400);
  }

  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    // Update buku dengan id yang sesuai
    books[index] = {
      id: bookId,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt: books[index].insertedAt,
      updatedAt,
    };
    return h.response(successResponse("Buku berhasil diperbarui")).code(200);
  }

  return h.response(failResponse("Gagal memperbarui buku. Id tidak ditemukan")).code(404);
};

const deleteBooksById = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    return h.response(successResponse("Buku berhasil dihapus")).code(200);
  }

  return h.response(failResponse("Buku gagal dihapus. Id tidak ditemukan")).code(404);
};

module.exports = {
  addBooks,
  getAllBooks,
  getBooksById,
  updateBooksById,
  deleteBooksById,
};