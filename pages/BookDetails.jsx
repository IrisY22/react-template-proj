import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;

export function BookDetails({ bookId, onBack }) {
  const [book, setBook] = useState(null);
  const [readingLevel, setReadingLevel] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [priceColor, setPriceColor] = useState("green");
  const [sale, setSale] = useState("ON SALE!!!");

  useEffect(() => {
    bookService.get(bookId).then((book) => setBook(book));
  }, []);

  useEffect(() => {
    if (!book) return;

    if (book.pageCount < 100) setReadingLevel("Light Reading");
    else if (book.pageCount > 500) setReadingLevel("Serious Reading");
    else if (book.pageCount > 200) setReadingLevel("Descent Reading");

    if (book.publishedDate < 2013) setPublishedDate("Vintage");
    else setPublishedDate("New");

    if (book.listPrice.amount > 150) setPriceColor("red");

    if (!book.listPrice.isOnSale) setSale(true);
  }, [book]);

  if (!book) return <div>Loading...</div>;
  return (
    <section className="book-details">
      <h1 className="red">{sale}</h1>
      <h1>book title: {book.title}</h1>
      <h1 className={priceColor}>book price: {book.listPrice.amount}</h1>
      <h1>Reading Level: {readingLevel}</h1>
      <h1>Publish Time: {publishedDate}</h1>
      <h1>book description: {book.description}</h1>
      <button onClick={onBack}>Back</button>
    </section>
  );
}
