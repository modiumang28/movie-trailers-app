import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch data from API
const useGetMovieList = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, isSuccess, isError, data, errorMessage };
};

export default useGetMovieList;
