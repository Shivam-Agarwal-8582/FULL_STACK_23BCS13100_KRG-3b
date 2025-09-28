import React, { useState } from "react";
import "./Book.css";

export default function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 2, title: "Atomic Habits", author: "James Clear" },
  ]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", author: "" });
  const [editingId, setEditingId] = useState(null);

  // submit (add or update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    const author = form.author.trim();
    if (!title || !author) return;

    if (editingId !== null) {
      setBooks((prev) =>
        prev.map((b) => (b.id === editingId ? { ...b, title, author } : b))
      );
      setEditingId(null);
    } else {
      setBooks((prev) => [...prev, { id: Date.now(), title, author }]);
    }
    setForm({ title: "", author: "" });
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setForm({ title: book.title, author: book.author });
  };

  const handleDelete = (id) => {
    // simple confirm to avoid accidental delete
    if (window.confirm("Delete this book?")) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const filteredBooks = books.filter((b) => {
    const q = search.toLowerCase();
    return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
  });

  // helpful debug: uncomment if you want to inspect state quickly
  // console.log("books", books, "editingId", editingId, "form", form);

  return (
    <div className="container">
      <h1>📚 Book Manager</h1>

      <input
        className="input"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Book Title"
          value={form.title}
          onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
        />
        <input
          className="input"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm((s) => ({ ...s, author: e.target.value }))}
        />
        <button type="submit" className="btn primary">
          {editingId !== null ? "Update Book" : "Add Book"}
        </button>
        {editingId !== null && (
          <button
            type="button"
            className="btn"
            onClick={() => { setEditingId(null); setForm({ title: "", author: "" }); }}
          >
            Cancel
          </button>
        )}
      </form>

      <ul className="book-list">
        {filteredBooks.length === 0 ? (
          <p className="no-books">No books found</p>
        ) : (
          filteredBooks.map((book) => (
            <li key={book.id} className="book-item">
              <div>
                <p className="title">{book.title}</p>
                <p className="author">{book.author}</p>
              </div>
              <div className="actions">
                <button className="btn edit" onClick={() => handleEdit(book)}>Edit</button>
                <button className="btn delete" onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
