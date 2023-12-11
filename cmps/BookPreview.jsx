export function BookPreview({ book }) {
  return (
    <article className="book-preview">
      <h2>Book Title: {book.title}</h2>
      <h4>Book Price {book.listPrice.amount}</h4>
      <img src={book.thumbnail} alt="" />
    </article>
  );
}
