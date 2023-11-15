const filterMovies = (movieData, appliedFilterList) => {
  // console.log(movieData);
  // console.log(appliedFilterList);
  const updatedMovieList = movieData.filter((movie) => {
    // console.log(movie);
    // if one true then return true
    return appliedFilterList.some((appliedFilter) => {
      return (
        movie.EventLanguage === appliedFilter.value ||
        movie.EventGenre.includes(appliedFilter.value)
      );
    });
  });
  // console.log("Updated movies: ", updatedMovieList);
  return updatedMovieList;
};

export default filterMovies;
