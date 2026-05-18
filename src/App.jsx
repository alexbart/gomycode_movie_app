import { useState } from "react";
import {MovieList} from "./components/MovieList";
import {Filter} from "./components/Filter";
import {AddMovie} from "./components/AddMovie";

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

  const addMovie = (newMovie) => {
    setMovies([...movies, { id: movies.length + 1, ...newMovie }]);
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      movie.rating >= ratingFilter
  );

  return (
    <div className="app">
      <h1>🎬 Movie App</h1>

      <Filter
        setTitleFilter={setTitleFilter}
        setRatingFilter={setRatingFilter}
      />

      <AddMovie addMovie={addMovie} />

      <MovieList movies={filteredMovies} />
    </div>
  );
}

export default App;