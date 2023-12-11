import { About } from "./pages/About.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { Home } from "./pages/Home.jsx";

const { useState } = React;

export function App() {
  const [page, setPage] = useState("Books");

  return (
    <section className="app main-layout">
      <header className="app-header full main-layout">
        <section>
          <h1>Miss Books</h1>
          <nav className="app-nav">
            <a onClick={() => setPage("Home")} href="#">
              Home
            </a>
            <a onClick={() => setPage("About")} href="#">
              About
            </a>
            <a onClick={() => setPage("Books")} href="#">
              Books
            </a>
          </nav>
        </section>
      </header>

      <main>
        {page === "Home" && <Home />}
        {page === "About" && <About />}
        {page === "Books" && <BookIndex />}
      </main>
    </section>
  );
}
