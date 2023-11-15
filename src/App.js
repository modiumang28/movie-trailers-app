import React, { useState, useEffect } from "react";
import useGetMovieList from "./customHooks/useGetMovieList/useGetMovieList";
import AppliedFilters from "./layouts/AppliedFilters/AppliedFilters";
import Body from "./layouts/Body/Body";
import Header from "./layouts/Header/Header";
const url = "https://in.bmscdn.com/m6/static/interview-mock/data.json";

function App() {
  const [movies, setMovies] = useState(null);

  const { isLoading, isSuccess, isError, data, errorMessage } =
    useGetMovieList(url);

  // useEffect to set movies state
  useEffect(() => {
    if (isSuccess) {
      setMovies(Object.values(data.moviesData).slice(0, 102));
    }
  }, [isSuccess]);

  return (
    <div className="App">
      <Header />
      <AppliedFilters />
      <Body movies={movies} />
    </div>
  );
}

export default App;
