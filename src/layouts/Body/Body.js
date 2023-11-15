import { useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import "./Body.css";

const Body = ({ movies }) => {
  const [showMovieDetails, setShowMovieDetails] = useState({
    movieId: null,
  });

  // Set the number of movies we want in a single row
  const itemsPerRow = 6;

  // Function to handle movie click and open Movie Trailer
  const handleMovieClick = (movie) => {
    setShowMovieDetails({ movieId: movie.EventCode });
  };

  return (
    <div className="movie-container">
      {movies?.map((movie, index) => (
        <>
          {index % itemsPerRow === 0 && (
            <div key={`row-${index / itemsPerRow}`} className="rol">
              {movies?.slice(index, index + itemsPerRow).map((rowItem) => (
                <MovieCard
                  key={rowItem.EventCode}
                  movie={rowItem}
                  onClick={handleMovieClick}
                />
              ))}
            </div>
          )}

          {movie.EventCode === showMovieDetails.movieId && (
            <div className="Modal">
              <VideoPlayer movie={movie} />
              <MovieDetails movie={movie} />
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Body;
