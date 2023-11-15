import AppliedFilters from "./layouts/AppliedFilters/AppliedFilters";
import Body from "./layouts/Body/Body";
import Header from "./layouts/Header/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <AppliedFilters />
      <Body />
    </div>
  );
}

export default App;
