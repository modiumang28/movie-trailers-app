import React from "react";

const MovieStats = ({ src, type, value }) => {
  return (
    <>
      <span>
        <img src={src} height="30px" width="30px" />
        <div>
          <div>{type}</div>
          <div>{value}</div>
        </div>
      </span>
    </>
  );
};

export default MovieStats;
