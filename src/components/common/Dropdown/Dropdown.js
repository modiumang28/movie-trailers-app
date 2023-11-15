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

  // Function to enable/disable Dropdown list
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to set className for the clicked Dropdown Item
  const isItemSelected = (isSelected) =>
    `${isSelected ? "Dropdown-item Dropdown-active" : "Dropdown-item"}`;

  //  Function to get the value of the clicked Dropdown Item
  const itemsInDropdown = (item) => (keyToRead ? item[keyToRead] : item);

  const Icon = () =>
    isOpen ? (
      <UpArrow onClick={handleDropdown} className="Dropdown-icon" />
    ) : (
      <DownArrow onClick={handleDropdown} className="Dropdown-icon" />
    );

  // Data not found Fallback
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
    // update the listOfAppliedFilterList state on the basis of prevState
    onSelect((prevState) => {
      // if isFilterSelected is true then we have to compare from previous state
      if (isFilterSelected) {
        // Find unique filters
        const uniqueNewElements = selectedItems.filter((newElement) => {
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
    });
  };

  // Function to handle click of a Dropdown item
  const onItemClick = (item) => {
    if (enableCheckBox) {
      isFilterSelected = !item.isSelected ? true : false;
      // Toggle isSelected for the clicked dropdown item
      const updatedDropdownItems = dropdownItems.map((dropdownItem) =>
        dropdownItem.optionId === item.optionId
          ? { ...dropdownItem, isSelected: !dropdownItem.isSelected }
          : { ...dropdownItem }
      );

      // get items whose isSelected is true
      const selectedItems = updatedDropdownItems.filter(
        (item) => item.isSelected
      );

      // get the value of all items whose isSelected is true separated by ", "
      const inputValue = selectedItems
        .map((item) => item[keyToRead])
        .join(", ");

      // Function call to update the listOfAppliedFilterList state
      onSelectFilter(selectedItems, item);

      // set dropdownValue state
      setDropdownValue(inputValue);

      // set updatedDropdownItems state
      setDropdownItems([...updatedDropdownItems]);
    }
  };

  // useEffect to set dropdown items state while adding unique Id for each item
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
