export function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img src={movie.posterURL} alt={movie.title} />

            <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <h4>⭐ {movie.rating}</h4>
            </div>
        </div>
    );
}
;