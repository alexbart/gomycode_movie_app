import { useState, useMemo, useEffect } from "react";
import { MovieList } from "./components/MovieList";
import { Filter } from "./components/Filter";
import { AddMovieModal } from "./components/AddMovieModal";
import { SortMovies } from "./components/SortMovies";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const [movies, setMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortType, setSortType] = useState("");

  // ⏱️ debounce user input
  const debouncedSearch = useDebounce(titleFilter, 600);

  // 🔄 loading + error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🌐 API fetch (runs when debounced value changes)
  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedSearch) return;

      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${debouncedSearch}&apikey=84610416`
        );

        const data = await res.json();

        if (data.Response === "True") {
          const formatted = data.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            posterURL: movie.Poster,
            description: movie.Year,
            rating: Math.floor(Math.random() * 5) + 1,
          }));

          setMovies(formatted);
        } else {
          setMovies([]);
          setError("No movies found");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearch]);

  // 🎯 add movie manually
  const addMovie = (movie) => {
    setMovies((prev) => [
      ...prev,
      { id: Date.now(), ...movie },
    ]);
  };

  // 🔎 filter + sort
  const filteredMovies = useMemo(() => {
    let result = [...movies].filter(
      (movie) => movie.rating >= ratingFilter
    );

    if (sortType === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [movies, ratingFilter, sortType]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🎬 Netflix Movies</h1>
          <AddMovieModal addMovie={addMovie} />
        </div>

        {/* SEARCH + FILTER */}
        <Filter
          setTitleFilter={setTitleFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
        />

        <SortMovies setSortType={setSortType} />

        {/* LOADING */}
        {loading && (
          <p className="text-yellow-400 mt-4">
            Loading movies...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-400 mt-4">{error}</p>
        )}

        {/* MOVIES */}
        <MovieList movies={filteredMovies} />
      </div>
    </div>
  );
}

export default App;