import React, { useState, useEffect } from "react";
import useGetMovieList from "./customHooks/useGetMovieList/useGetMovieList";
import AppliedFilters from "./layouts/AppliedFilters/AppliedFilters";
import Body from "./layouts/Body/Body";
import Header from "./layouts/Header/Header";
import filterMovies from "./utils/filterMovies";
const url = "https://in.bmscdn.com/m6/static/interview-mock/data.json";

function App() {
  const [movies, setMovies] = useState(null);
  const [listOfAppliedFilters, setListOfAppliedFilters] = useState([]);

  const { isLoading, isSuccess, isError, data, errorMessage } =
    useGetMovieList(url);

  console.log("Applied Filters: ", listOfAppliedFilters);

  // useEffect to set movies state
  useEffect(() => {
    if (isSuccess) {
      setMovies(Object.values(data.moviesData).slice(10, 102));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess && listOfAppliedFilters.length !== 0 && data) {
      const movieData = Object.values(data.moviesData).slice(10, 40);
      filterMovies(movieData, listOfAppliedFilters);
    }
  });

  return (
    <div className="App">
      <Header
        appliedFilterList={listOfAppliedFilters}
        onAppliedFilter={setListOfAppliedFilters}
      />
      <AppliedFilters />
      <Body movies={movies} />
    </div>
  );
}

export default App;
