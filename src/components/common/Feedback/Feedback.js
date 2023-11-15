import "./Feedback.css";

const Feedback = ({ src, type, vote }) => {
  return (
    <div className="movie-rating">
      <div className="rating-img">
        <img src={src} height="20px" width="25px" />
      </div>
      <div className="rating-type">{type}</div>
      <div className="rating-vote">{`(${vote})`}</div>
    </div>
  );
};

export default Feedback;
