import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";
import { bookJson } from "../books.js";

const BOOK_KEY = "bookDB";
var gFilterBy = { title: "", price: 0, readingLevel: "" };
_createBooks();

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
  getNextBookIdx,
  getFilterBy,
  setFilterBy,
};

function query() {
  return storageService.query(BOOK_KEY).then((books) => {
    if (gFilterBy.title) {
      const regex = new RegExp(gFilterBy.title, "i");
      books = books.filter((book) => regex.test(book.title));
    }
    if (gFilterBy.price) {
      books = books.filter((book) => book.listPrice.amount >= gFilterBy.price);
    }
    if (gFilterBy.readingLevel) {
      books = books.filter((book) =>
        filterByLevel(book.pageCount, gFilterBy.readingLevel)
      );
    }
    return books;
  });
}

function filterByLevel(bookLength, level) {
  if (level === "") return true;
  if (level === "100") {
    return bookLength < 100;
  } else if (level === "200") {
    if (bookLength > 200 && bookLength <= 500) return true;
  } else if (level === "500") {
    return bookLength > 500;
  }
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId);
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId);
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book);
  } else {
    return storageService.post(BOOK_KEY, book);
  }
}

function getEmptyBook(title = "", price = 0) {
  return { id: "", title, price };
}

function getDefaultFilter() {
  return { title: "", price: "" };
}

function getFilterBy() {
  return { ...gFilterBy };
}

function setFilterBy(filterBy = {}) {
  if (filterBy.title !== undefined) gFilterBy.title = filterBy.title;
  if (filterBy.price !== undefined) gFilterBy.price = filterBy.price;
  if (filterBy.readingLevel !== undefined)
    gFilterBy.readingLevel = filterBy.readingLevel;
  return gFilterBy;
}

function getNextBookIdx(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let nextBookIdx = books.findIndex((book) => book.id === bookId) + 1;
    if (nextBookIdx === books.length) nextBookIdx = 0;
    return books[nextBookIdx].id;
  });
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY);
  if (!books || !books.length) {
    books = bookJson();

    utilService.saveToStorage(BOOK_KEY, books);
  }
}

function _createBook(title, price = 20) {
  const book = getEmptyBook(title, price);
  book.id = utilService.makeId();

  return book;
}
