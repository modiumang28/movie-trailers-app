import Actions from "../../components/Actions/Actions";
import Button from "../../components/common/Button/Button";
import "./Header.css";

const Header = ({ appliedFilterList, onAppliedFilter }) => {
  return (
    <div className="header">
      <div className="header-left">
        <div className="header-name">Movie Trailers</div>
        <Button label="COMING SOON" className="btn-primary" />
        <Button label="NOW SHOWING" className="btn-secondary" />
      </div>
      <div className="header-right">
        <Actions
          appliedFilterList={appliedFilterList}
          onAppliedFilter={onAppliedFilter}
        />
      </div>
    </div>
  );
};

export default Header;
