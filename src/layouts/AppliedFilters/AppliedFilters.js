import { removeImg } from "../../assets/images";
import "./AppliedFilters.css";

const AppliedFilters = ({ appliedFilterList, onClick }) => {
  return (
    <>
      <div className="filter-container">
        <span>Applied Filters: </span>
        {appliedFilterList?.map((filter, index) => (
          <div key={index} className="filter-box">
            <p>{filter?.value}</p>
            <div className="remove-icon" onClick={() => onClick(filter)}>
              <img src={removeImg} height="15px" alt="cross" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AppliedFilters;
