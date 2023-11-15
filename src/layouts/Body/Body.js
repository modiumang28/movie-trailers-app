const Body = ({ movies }) => {
  const itemsPerRow = 6;
  return (
    <div className="movie-container">
      {movies?.map((movie, index) => (
        <>
          {index % itemsPerRow === 0 && (
            <div key={`row-${index / itemsPerRow}`} className="rol">
              {movies?.slice(index, index + itemsPerRow).map((rowItem) => (
                <h1>{rowItem.EventTitle}</h1>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Body;
