import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const { EventImageUrl, EventTitle } = movie;

  return (
    <div className="items">
      <div className="play-icon">Play Icon</div>
      <div className="movie-image">
        <img src={EventImageUrl} alt={`${EventTitle}-poster`} />
      </div>
      <div className="movie-name">{EventTitle}</div>
    </div>
  );
};

export default MovieCard;
