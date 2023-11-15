import { useEffect, useState } from "react";
import useGetMovieList from "../../customHooks/useGetMovieList/useGetMovieList";
import Dropdown from "../common/Dropdown/Dropdown";
const url = "https://in.bmscdn.com/m6/static/interview-mock/data.json";

const Actions = ({ appliedFilterList, onAppliedFilter }) => {
  const [languages, setLanguages] = useState([]);

  const { isLoading, isSuccess, isError, data, errorMessage } =
    useGetMovieList(url);

  useEffect(() => {
    if (isSuccess && languages.length === 0 && data) {
      const { languageList } = data;
      const modifiedLanguageList = languageList.map((lang, index) => {
        return { value: lang, id: index };
      });
      setLanguages([...modifiedLanguageList]);
    }
  }, [isSuccess, languages, data]);

  return (
    <div className="dropdownAll-container">
      <Dropdown
        name="language"
        options={languages}
        keyToRead={"value"}
        placeholder={"All Languages"}
        onSelect={onAppliedFilter}
        appliedFilterList={appliedFilterList}
      />
    </div>
  );
};

export default Actions;
