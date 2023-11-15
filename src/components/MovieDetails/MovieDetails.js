import React from "react";
import {
  likeImg,
  dislikeImg,
  calendarImg,
  questionImg,
} from "../../assets/images";
import Button from "../common/Button/Button";
import "./MovieDetails.css";

const MovieDetails = ({ movie }) => {
  // Function that returns an array of genre for each movie
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
          <span>
            <img src={likeImg} height="30px" width="30px" />
            <div>
              <div>{`${movie.wtsPerc}%`}</div>
              <div>{`${movie.csCount} votes`}</div>
            </div>
          </span>
          <span>
            <img src={calendarImg} height="30px" width="30px" />
            <div>
              <div>{`${movie.DispReleaseDate.split(" ")[0]}`}</div>
              <div>{`${movie.MonthID.slice(0, 4)}`}</div>
            </div>
          </span>
        </div>
        <div className="movie-about">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </div>
      </div>
      <div className="movie-ratings-container">
        <div className="movie-rating">
          <div className="rating-img">
            <img src={likeImg} height="20px" width="25px" />
          </div>
          <div className="rating-type">WILL WATCH</div>
          <div className="rating-vote">{`(${movie.wtsCount})`}</div>
        </div>
        <div className="movie-rating">
          <div className="rating-img">
            <img src={questionImg} height="20px" width="25px" />
          </div>
          <div className="rating-type">MAYBE</div>
          <div className="rating-vote">{`(${movie.maybeCount})`}</div>
        </div>
        <div className="movie-rating">
          <div className="rating-img">
            <img src={dislikeImg} height="20px" width="25px" />
          </div>
          <div className="rating-type">WON'T WATCH</div>
          <div className="rating-vote">{`(${movie.dwtsCount})`}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
