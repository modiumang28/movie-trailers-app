import MovieCard from "../../components/MovieCard/MovieCard";

const Body = ({ movies }) => {
  const itemsPerRow = 6;
  return (
    <div className="movie-container">
      {movies?.map((movie, index) => (
        <>
          {index % itemsPerRow === 0 && (
            <div key={`row-${index / itemsPerRow}`} className="rol">
              {movies?.slice(index, index + itemsPerRow).map((rowItem) => (
                <MovieCard key={rowItem.EventCode} movie={rowItem} />
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Body;
