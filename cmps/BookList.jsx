import { BookPreview } from "./BookPreview.jsx";
const { useState, useEffect, useRef } = React;

export function BookList({ books, onRemoveBook, onSelectBookId }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>
          <BookPreview book={book} />
          <section>
            <button onClick={() => onRemoveBook(book.id)}>Remove book</button>
            <button onClick={() => onSelectBookId(book.id)}>Details</button>
          </section>
        </li>
      ))}
    </ul>
  );
}
