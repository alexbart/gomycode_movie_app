import { useState } from "react";

export function AddMovie({ addMovie }) {
    const [newMovie, setNewMovie] = useState({
        title: "",
        description: "",
        posterURL: "",
        rating: "",
    });

    const handleChange = (e) => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addMovie({
            ...newMovie,
            rating: Number(newMovie.rating),
        });

        setNewMovie({
            title: "",
            description: "",
            posterURL: "",
            rating: "",
        });
    };

    return (
        <form className="add-movie" onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Movie title"
                value={newMovie.title}
                onChange={handleChange}
            />

            <input
                type="text"
                name="description"
                placeholder="Description"
                value={newMovie.description}
                onChange={handleChange}
            />

            <input
                type="text"
                name="posterURL"
                placeholder="Poster URL"
                value={newMovie.posterURL}
                onChange={handleChange}
            />

            <input
                type="number"
                name="rating"
                placeholder="Rating"
                min="0"
                max="5"
                value={newMovie.rating}
                onChange={handleChange}
            />

            <button type="submit">Add Movie</button>
        </form>
    );
}
