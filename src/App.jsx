import { useState } from "react";
import { MovieList } from "./components/MovieList";
import { Filter } from "./components/Filter";
import { AddMovie } from "./components/AddMovie";
import { AddMovieModal } from "./components/AddMovieModal";
import { SortMovies } from "./components/SortMovies";

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
      title: "Game of Thrones",
      description: "Nine noble families fight for control over Westeros.",
      posterURL:
        "https://m.media-amazon.com/images/I/91dSMhdIzTL._AC_SY679_.jpg",
      rating: 4,
    },
    {
      id: 3,
      title: "Stranger Things",
      description: "Kids uncover supernatural mysteries in their town.",
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

//