import { bookService } from "../services/book.service.js";
const { useParams, useNavigate, Link } = ReactRouterDOM;
const { useState, useEffect } = React;

const REVIEW_KEY = "reviewDB";

export function AddReview() {
  // [{ id,fullname,readAt, bookid, review }];
  const [review, setReview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [rating, setRating] = useState(0);
  const [readAt, setReadAt] = useState("12/09/2023");
  const params = useParams();
  const navigate = useNavigate();

  function handleSubmit() {
    var review = {
      id: "",
      fullName,
      rating,
      readAt,
      bookId: params.bookId,
    };

    bookService
      .save(REVIEW_KEY, review)
      .then(() => navigate("/book"))
      .catch((err) => console.log("err:", err));
  }

  return (
    <section className="book-edit">
      <h1>Add Review</h1>

      <label>Full Name: </label>
      <input
        onChange={(e) => {
          setFullName(e.target.value);
        }}
        value={fullName}
        type="text"
        name="fullName"
        id="fullName"
      />

      <label>Rating: </label>
      <input
        onChange={(e) => {
          setRating(e.target.value);
        }}
        value={rating}
        type="number"
        name="rating"
        id="rating"
        min="1"
        max="5"
      />

      <label htmlFor="dateInput">Read At:</label>
      <input
        onChange={(e) => {
          setReadAt(e.target.value);
        }}
        value={readAt}
        type="date"
        id="readAt"
        name="readAt"
      />

      <button disabled={!fullName} onClick={handleSubmit}>
        Save
      </button>
    </section>
  );
}
