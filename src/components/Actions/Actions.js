import { useEffect, useState } from "react";
import useGetMovieList from "../../customHooks/useGetMovieList/useGetMovieList";
import Dropdown from "../common/Dropdown/Dropdown";
import { category, genres } from "../../db";
import "./Actions.css";
const url = "https://in.bmscdn.com/m6/static/interview-mock/data.json";

const Actions = ({ appliedFilterList, onAppliedFilter }) => {
  const [languages, setLanguages] = useState([]);

  const { isLoading, isSuccess, isError, data, errorMessage } =
    useGetMovieList(url);

  // useEffect to set languages state
  useEffect(() => {
    if (isSuccess && languages.length === 0 && data) {
      const { languageList } = data;
      // return an updated languages array while adding Id for each language
      const modifiedLanguageList = languageList.map((lang, index) => {
        return { value: lang, id: index };
      });
      setLanguages([...modifiedLanguageList]);
    }
  }, [isSuccess, languages, data]);

  return (
    <div className="dropdownAll-container">
      <Dropdown
        name="category"
        options={category}
        keyToRead={"value"}
        placeholder={"Fresh"}
        onSelect={onAppliedFilter}
        enableCheckBox={false}
      />
      <Dropdown
        name="language"
        options={languages}
        keyToRead={"value"}
        placeholder={"All Languages"}
        onSelect={onAppliedFilter}
        appliedFilterList={appliedFilterList}
      />
      <Dropdown
        name="genre"
        options={genres}
        keyToRead={"value"}
        placeholder={"All Genres"}
        onSelect={onAppliedFilter}
        appliedFilterList={appliedFilterList}
      />
    </div>
  );
};

export default Actions;
