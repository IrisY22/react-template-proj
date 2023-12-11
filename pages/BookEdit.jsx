import { bookService } from "../services/book.service.js";
const { useNavigate, useParams } = ReactRouterDOM;
const { useState, useEffect } = React;

const BOOK_KEY = "bookDB";

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook());
  console.log("bookToEdit:", bookToEdit);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.bookId) {
      loadBook();
    }
  }, []);

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBookToEdit)
      .catch((err) => console.log("err:", err));
  }

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value;
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }));
  }

  function handlePriceChange({ target }) {
    const newListPrice = {
      amount: +target.value,
      currencyCode: listPrice.currencyCode,
      isOnSale: listPrice.isOnSale,
    };
    setBookToEdit((prevBook) => ({ ...prevBook, listPrice: newListPrice }));
  }

  function onSaveBook(ev) {
    ev.preventDefault();
    bookService
      .save(BOOK_KEY, bookToEdit)
      .then(() => navigate("/book"))
      .catch((err) => console.log("err:", err));
  }

  const { title, listPrice } = bookToEdit;
  return (
    <section className="book-edit">
      <h1>Add Book</h1>
      <form onSubmit={onSaveBook}>
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          name="title"
          id="title"
        />

        <label htmlFor="price">Price</label>
        <input
          onChange={handlePriceChange}
          value={listPrice.amount}
          type="number"
          name="listPrice.amount"
          id="price"
        />
        <button disabled={!title}>Save</button>
      </form>
    </section>
  );
}
