import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DownArrow, UpArrow } from "../../../assets";
import "./Dropdown.css";

const Dropdown = (props) => {
  const {
    options,
    onSelect,
    keyToRead = "",
    placeholder = "Select",
    name,
    isDisabled = false,
    isLoading = false,
    enableCheckBox = true,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("");

  let isFilterSelected;

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isItemSelected = (isSelected) =>
    `${isSelected ? "Dropdown-item Dropdown-active" : "Dropdown-item"}`;

  const itemsInDropdown = (item) => (keyToRead ? item[keyToRead] : item);

  const Icon = () =>
    isOpen ? (
      <UpArrow onClick={handleDropdown} className="Dropdown-icon" />
    ) : (
      <DownArrow onClick={handleDropdown} className="Dropdown-icon" />
    );

  const DataNotFoundFallBack = () => (
    <ul className="Dropdown-menu">
      <li className="Dropdown-item">
        {isLoading ? (
          <p className="Dropdown-text ">Loading...</p>
        ) : (
          <p className="Dropdown-text ">No Data found</p>
        )}
      </li>
    </ul>
  );

  const onSelectFilter = (selectedItems, item) => {
    onSelect((prevState) => {
      // if true then we know we have to compare from previous state
      if (isFilterSelected) {
        const uniqueNewElements = selectedItems.filter((newElement) => {
          // if previous state is empty it means that the first item has been clicked
          if (prevState.length > 0) {
            return prevState.every(
              (existingElement) =>
                existingElement.optionId !== newElement.optionId
            );
          } else {
            return newElement;
          }
        });

        // Combine the existing array with the unique new elements
        return [...prevState, ...uniqueNewElements];
      } else {
        return prevState.filter(
          (previousStateItem) => previousStateItem.optionId !== item.optionId
        );
      }
      // Identify the unique new elements that are not already in the existing array
    });
  };

  const onItemClick = (item) => {
    isFilterSelected = !item.isSelected ? true : false; // if isFilterSelected comes out to be true we will know that the item has been checked
    // setIsFilterSelected(boolVal);
    const updatedDropdownItems = dropdownItems.map((dropdownItem) =>
      dropdownItem.optionId === item.optionId
        ? { ...dropdownItem, isSelected: !dropdownItem.isSelected }
        : { ...dropdownItem }
    );

    const selectedItems = updatedDropdownItems.filter(
      (item) => item.isSelected
    );

    const inputValue = selectedItems.map((item) => item[keyToRead]).join(", ");

    // console.log("Selected Elements: ", selectedItems);
    onSelectFilter(selectedItems, item);
    // console.log("Unique Elements", appliedFilterList);
    // onSelect(uniqueElements);
    setDropdownValue(inputValue);
    setDropdownItems([...updatedDropdownItems]);
  };

  useEffect(() => {
    if (
      options.length > 0 &&
      Array.isArray(options) &&
      dropdownItems?.length === 0
    ) {
      const modifiedOptions = options?.map((obj) => {
        return {
          ...obj,
          optionId: uuidv4(),
          isSelected: false,
        };
      });
      setDropdownItems([...modifiedOptions]);
    }
  }, [options, dropdownItems]);

  return (
    <div className="Dropdown">
      <div className="Dropdown-field">
        <input
          name={name}
          className="Dropdown-input"
          value={dropdownValue}
          readOnly={true}
          onClick={handleDropdown}
          type="text"
          placeholder={placeholder}
          isDisabled={isDisabled}
          draggable={false}
        />
        <Icon />
      </div>

      {isOpen && (
        <React.Fragment>
          <div className="Dropdown-backDrop" onClick={handleDropdown}></div>
          {Array.isArray(options) && options?.length !== 0 && (
            <ul className="Dropdown-menu">
              {dropdownItems?.map((item) => (
                <li
                  className={isItemSelected(item?.isSelected)}
                  key={uuidv4()}
                  onClick={() => onItemClick(item)}
                >
                  {enableCheckBox && (
                    <input
                      className="checkbox"
                      type="checkbox"
                      name={item[keyToRead]}
                      value={item.isSelected}
                      checked={item.isSelected}
                      readOnly={true}
                      id={item?.optionId}
                    />
                  )}
                  <label className="Dropdown-text" htmlFor={item?.optionId}>
                    {itemsInDropdown(item)}
                  </label>
                </li>
              ))}
            </ul>
          )}

          {(!Array.isArray(options) || options.length === 0) && (
            <DataNotFoundFallBack />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Dropdown;
