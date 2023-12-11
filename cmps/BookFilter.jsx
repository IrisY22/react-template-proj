const { useState, useEffect } = React;

export function BookFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit, onSetFilter]);

  function onSetFilterBy(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
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

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function handlePriceChange({ target }) {
    const value = target.value;
    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, price: value }));
  }

  function changeReadingLevel(level) {
    setFilterByToEdit((prevFilterBy) => ({
      ...prevFilterBy,
      readingLevel: level,
    }));
  }

  const { title, price, readingLevel } = filterByToEdit;

  return (
    <section className="book-filter">
      <h2>Filter Our Books</h2>
      <form onSubmit={onSetFilterBy}>
        <label htmlFor="title">Title: </label>
        <input
          value={title}
          onChange={handleChange}
          type="text"
          id="title"
          name="title"
        />

        <label htmlFor="price">Price: </label>
        <input
          value={price || ""}
          onChange={handlePriceChange}
          type="number"
          id="price"
          name="price"
        />

        <label>Choose Your Reading Level:</label>
        <select
          id="readingLevel"
          name="readingLevel"
          value={readingLevel}
          onChange={(event) => {
            changeReadingLevel(event.target.value);
          }}
        >
          <option value="">All Books</option>
          <option value={100}>Light Reading</option>
          <option value={200}>Descent Reading</option>
          <option value={500}>Serious Reading</option>
        </select>

        {/* <button type="submit">Submit</button> */}
      </form>
    </section>
  );
}
