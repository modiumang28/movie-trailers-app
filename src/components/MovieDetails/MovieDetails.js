import React from "react";
import {
  likeImg,
  dislikeImg,
  calendarImg,
  questionImg,
} from "../../assets/images";
import Button from "../common/Button/Button";
import Feedback from "../common/Feedback/Feedback";
import MovieStats from "../common/MovieStats/MovieStats";
import "./MovieDetails.css";

const MovieDetails = ({ movie }) => {
  // Function to get an array of genre for each movie
  const splitGenreToArray = (genre) => {
    return genre.split("|");
  };

  return (
    <div className="movie-info-container">
      <div>
        <div className="movie-title">{movie.EventTitle}</div>
        <div className="movie-language">
          {movie.EventLanguage.toUpperCase()}
        </div>
        <div>
          {splitGenreToArray(movie.EventGenre).map((genre) => {
            return <Button label={genre.toUpperCase()} className="btn-genre" />;
          })}
        </div>
        <div className="votes-container">
          <MovieStats
            src={likeImg}
            type={`${movie.wtsPerc}%`}
            value={`${movie.csCount} votes`}
          />
          <MovieStats
            src={calendarImg}
            type={`${movie.DispReleaseDate.split(" ")[0]}`}
            value={`${movie.MonthID.slice(0, 4)}`}
          />
        </div>
        <div className="movie-about">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </div>
      </div>
      <div className="movie-ratings-container">
        <Feedback src={likeImg} type="WILL WATCH" vote={`${movie.wtsCount}`} />
        <Feedback src={questionImg} type="MAYBE" vote={`${movie.maybeCount}`} />
        <Feedback
          src={dislikeImg}
          type="WON'T WATCH"
          vote={`${movie.dwtsCount}`}
        />
      </div>
    </div>
  );
};

export default MovieDetails;
