import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DownArrow, UpArrow } from "../../../assets";
import "./Dropdown.css";

const Dropdown = (props) => {
  const {
    options,
    onSelect,
    appliedFilterList,
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

  const handleDropdown = () => {
    setIsOpen(!isOpen);
    // !isOpen && onClick && onClick();
    // return isDisabled ? setIsOpen(false) : setIsOpen(!isOpen);
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
                <li className={isItemSelected(item?.isSelected)} key={uuidv4()}>
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
