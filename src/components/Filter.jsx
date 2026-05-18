
export function Filter({ setTitleFilter, setRatingFilter }) {
    return (
        <div className="filter">
            <input type="text"
                placeholder="Search by title..."
                onChange={(e) => setTitleFilter(e.target.value)}
            />

            <input type="number"
                placeholder="Minimum rating"
                min="0"
                max="5"
                onChange={(e) => setRatingFilter(Number(e.target.value))}
            />

        </div>
    );
}
