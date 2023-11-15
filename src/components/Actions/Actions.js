import Dropdown from "../common/Dropdown/Dropdown";

const Actions = ({ appliedFilterList, onAppliedFilter }) => {
  return (
    <div className="dropdownAll-container">
      <Dropdown
        name="language"
        options={[]}
        keyToRead={"value"}
        placeholder={"All Languages"}
        onSelect={onAppliedFilter}
        appliedFilterList={appliedFilterList}
      />
    </div>
  );
};

export default Actions;
