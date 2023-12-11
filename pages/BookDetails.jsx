import { bookService } from "../services/book.service.js";
import { LongTxt } from "../cmps/LongTxt.jsx";
import { AddReview } from "../cmps/AddReview.jsx";
const { useParams, useNavigate, Link } = ReactRouterDOM;

const { useState, useEffect } = React;

export function BookDetails({ bookId, onBack }) {
  const [book, setBook] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const [readingLevel, setReadingLevel] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [priceColor, setPriceColor] = useState("green");
  const [sale, setSale] = useState("ON SALE!!!");

  useEffect(() => {
    loadBook();
  }, [params.bookId]);

  function loadBook() {
    bookService
      .get(params.bookId)
      .then((book) => setBook(book))
      .catch((err) => {
        console.log("err:", err);
        navigate("/");
      });
  }

  function onBack() {
    navigate("/book");
  }

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
      <img src={book.thumbnail} alt="" />
      <h1 className="red">{sale}</h1>
      <h1>book title: {book.title}</h1>
      <h1 className={priceColor}>book price: {book.listPrice.amount}</h1>
      <h1>Reading Level: {readingLevel}</h1>
      <h1>Publish Time: {publishedDate}</h1>
      <h1 className="book-details-info-row">
        <span className="book-details-info-title">Description:</span>
        <LongTxt txt={book.description} />
      </h1>
      <h1>Reviews: {}</h1>

      <Link to={`/book/review/:${params.bookId}`}>Add Review</Link>
      <button onClick={onBack}>Back</button>
      {/* <Link to={`/book/u4QgwL`}>Next Book</Link> */}
    </section>
  );
}
