import "./VideoPlayer.css";

const VideoPlayer = ({ movie }) => {
  // Get the trailer Id for each youtube URL
  const trailerId = movie.TrailerURL.slice(movie.TrailerURL.indexOf("=") + 1);
  const url = `https://www.youtube.com/embed/${trailerId}`;

  return (
    <>
      <iframe src={url} height="500px"></iframe>
    </>
  );
};

export default VideoPlayer;
