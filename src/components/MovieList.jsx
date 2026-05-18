import { MovieCard } from "./MovieCard"

export function MovieList({movies}) {
  return (
    <div className="movie-list">
        {movies.map((movie) =>(
            <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
  )
}
