const { Link } = ReactRouterDOM;

import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
import { showSuccessMsg } from "../services/event-bus.service.js";

const { useState, useEffect } = React;

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());

  useEffect(() => {
    bookService.setFilterBy(filterBy);
    loadBooks();

    return () => {};
  }, [filterBy]);

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => console.log("err:", err));
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => {
          return prevBooks.filter((book) => book.id !== bookId);
        });
        showSuccessMsg(`Book successfully removed!`);
      })
      .catch((err) => console.log("err:", err));
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy);
  }

  const { title, price, readingLevel } = filterBy;

  if (!books) return <div>Loading...</div>;
  return (
    <section className="book-index">
      <h1>Welcome to book index!</h1>
      <BookFilter
        filterBy={{ title, price, readingLevel }}
        onSetFilter={onSetFilter}
      />
      <Link to="/book/edit">Add</Link>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  );
}
