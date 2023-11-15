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

  //console.log("Applied Filters: ", listOfAppliedFilters);

  // Function to remove a filter from the filters state
  const removeFilter = (filter) => {
    console.log(filter);
    const filteredList = listOfAppliedFilters.filter((value) => {
      if (value.optionId === filter.optionId) {
        if (value.isSelected) {
          value.isSelected = false;
        }
        console.log(value);
      } else {
        return true;
      }
    });
    console.log();
    setListOfAppliedFilters(filteredList);
  };

  // useEffect to set movies state
  useEffect(() => {
    if (isSuccess) {
      setMovies(Object.values(data.moviesData).slice(10, 102));
    }
  }, [isSuccess]);

  useEffect(() => {
    // console.log("Triggered");
    // console.log(listOfAppliedFilters);
    if (isSuccess && data) {
      const movieData = Object.values(data.moviesData).slice(0, 102);
      if (isSuccess && listOfAppliedFilters.length !== 0 && data) {
        const updatedMoviesList = filterMovies(movieData, listOfAppliedFilters);
        // console.log("Updated movies: ", updatedMoviesList);
        setMovies(updatedMoviesList);
      } else if (listOfAppliedFilters.length === 0) {
        // console.log(movieData);
        setMovies(movieData);
      }
    }
  }, [listOfAppliedFilters]);

  return (
    <div className="App">
      <Header
        appliedFilterList={listOfAppliedFilters}
        onAppliedFilter={setListOfAppliedFilters}
      />
      <AppliedFilters
        appliedFilterList={listOfAppliedFilters}
        onClick={removeFilter}
      />
      <Body movies={movies} />
    </div>
  );
}

export default App;
