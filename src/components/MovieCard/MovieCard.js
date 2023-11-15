import Play from "../../assets/Play/Play";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick }) => {
  const { EventImageUrl, EventTitle } = movie;

  return (
    <div className="items">
      <div className="play-icon" onClick={() => onClick(movie)}>
        <Play />
      </div>
      <div className="movie-image">
        <img src={EventImageUrl} alt={`${EventTitle}-poster`} />
      </div>
      <div className="movie-name">{EventTitle}</div>
    </div>
  );
};

export default MovieCard;
