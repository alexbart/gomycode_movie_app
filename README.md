# 🎬 React Movie App — Tailwind Edition

A modern React movie application built using:

* React JSX
* Tailwind CSS
* React Hooks (`useState`)
* Component-based architecture

Features included:

* Add movies
* Filter by title
* ⭐ Filter by rating using clickable stars
* Sort movies A–Z
* Sort by highest rating
* Modal form for adding movies
* Responsive UI

---

# 📁 Project Structure

```txt
src/
│
├── components/
│   ├── AddMovieModal.jsx
│   ├── Filter.jsx
│   ├── MovieCard.jsx
│   ├── MovieList.jsx
│   └── SortMovies.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 🚀 Installation

## 1. Create React App

```bash
npm create vite@latest movie-app
```

## 2. Install Dependencies

```bash
cd movie-app
npm install
```

## 3. Install Tailwind CSS

```bash
npm install -D tailwindcss @tailwindcss/vite
```

---

# ⚙️ Configure Vite

## vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

# 🎨 index.css

```css
@import "tailwindcss";
```

---

# 🧠 App.jsx

```jsx
import { useMemo, useState } from "react";
import MovieList from "./components/MovieList";
import Filter from "./components/Filter";
import AddMovieModal from "./components/AddMovieModal";
import SortMovies from "./components/SortMovies";

function App() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Breaking Bad",
      description: "A chemistry teacher becomes a drug kingpin.",
      posterURL:
        "https://m.media-amazon.com/images/I/81aC7I7K6-L._AC_SY679_.jpg",
      rating: 5,
    },
    {
      id: 2,
      title: "Interstellar",
      description: "A space mission to save humanity.",
      posterURL:
        "https://m.media-amazon.com/images/I/71n58Y7Ai-L._AC_SY679_.jpg",
      rating: 4,
    },
    {
      id: 3,
      title: "Stranger Things",
      description: "Kids investigate supernatural mysteries.",
      posterURL:
        "https://m.media-amazon.com/images/I/81iB0QK4WmL._AC_SY679_.jpg",
      rating: 4,
    },
  ]);

  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortType, setSortType] = useState("");

  const addMovie = (movie) => {
    setMovies((prev) => [...prev, { id: Date.now(), ...movie }]);
  };

  const filteredMovies = useMemo(() => {
    let updatedMovies = [...movies].filter(
      (movie) =>
        movie.title
          .toLowerCase()
          .includes(titleFilter.toLowerCase()) &&
        movie.rating >= ratingFilter
    );

    if (sortType === "az") {
      updatedMovies.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "rating") {
      updatedMovies.sort((a, b) => b.rating - a.rating);
    }

    return updatedMovies;
  }, [movies, titleFilter, ratingFilter, sortType]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold">🎬 Movie App</h1>

          <AddMovieModal addMovie={addMovie} />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">
          <Filter
            setTitleFilter={setTitleFilter}
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
          />

          <SortMovies setSortType={setSortType} />
        </div>

        <MovieList movies={filteredMovies} />
      </div>
    </div>
  );
}

export default App;
```

---

# ⭐ Filter.jsx

```jsx
function Filter({ setTitleFilter, ratingFilter, setRatingFilter }) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search movies..."
        className="px-4 py-2 rounded-lg bg-gray-800 text-white outline-none"
        onChange={(e) => setTitleFilter(e.target.value)}
      />

      <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRatingFilter(star)}
            className={`text-2xl transition ${
              star <= ratingFilter
                ? "text-yellow-400"
                : "text-gray-500"
            }`}
          >
            ★
          </button>
        ))}

        <button
          onClick={() => setRatingFilter(0)}
          className="ml-2 text-sm text-red-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filter;
```

---

# 🔃 SortMovies.jsx

```jsx
function SortMovies({ setSortType }) {
  return (
    <select
      onChange={(e) => setSortType(e.target.value)}
      className="bg-gray-800 px-4 py-2 rounded-lg outline-none"
    >
      <option value="">Sort Movies</option>
      <option value="az">A-Z</option>
      <option value="rating">Highest Rating</option>
    </select>
  );
}

export default SortMovies;
```

---

# ➕ AddMovieModal.jsx

```jsx
import { useState } from "react";

function AddMovieModal({ addMovie }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMovie({
      ...form,
      rating: Number(form.rating),
    });

    setForm({
      title: "",
      description: "",
      posterURL: "",
      rating: "",
    });

    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold"
      >
        + Add Movie
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Add Movie</h2>

              <button
                onClick={() => setOpen(false)}
                className="text-red-400 text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Movie Title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 outline-none"
                required
              />

              <textarea
                name="description"
                placeholder="Movie Description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 outline-none"
              />

              <input
                type="text"
                name="posterURL"
                placeholder="Poster URL"
                value={form.posterURL}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 outline-none"
                required
              />

              <input
                type="number"
                min="1"
                max="5"
                name="rating"
                placeholder="Rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 outline-none"
                required
              />

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold"
              >
                Save Movie
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddMovieModal;
```

---

# 🎬 MovieCard.jsx

```jsx
function MovieCard({ movie }) {
  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition duration-300">
      <img
        src={movie.posterURL}
        alt={movie.title}
        className="h-96 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{movie.title}</h2>

        <p className="text-gray-400 text-sm mb-3">
          {movie.description}
        </p>

        <div className="text-yellow-400 text-lg">
          {"★".repeat(movie.rating)}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
```

---

# 🎥 MovieList.jsx

```jsx
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default MovieList;
```

---

# 🧩 main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

# ✨ Features Summary

## ✅ Core Features

* Display movie cards
* Add new movies
* Filter by title
* Filter using clickable stars
* Sort alphabetically
* Sort by rating

## ✅ UI Features

* Responsive design
* Modal popup form
* Hover animations
* Dark Netflix-style layout

## ✅ React Concepts Used

* `useState`
* `useMemo`
* Props
* Conditional rendering
* Controlled forms
* Array filtering
* Array sorting
* Component architecture

---

# 🏁 Run Project

```bash
npm run dev
```

---

# 📸 Future Improvements

* Add React Router
* Add movie details page
* Add trailer modal
* Save movies to localStorage
* Integrate TMDB API
* Add Framer Motion animations
* Add dark/light mode

---

# 🏆 Final Result

You now have a fully modern React + Tailwind Movie App suitable for:

* React checkpoints
* Portfolio projects
* Junior frontend interviews
* Tailwind practice
* React hooks practice
