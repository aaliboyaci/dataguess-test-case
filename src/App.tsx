import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./queries/getCountries";
import "./components/Loading.css";
import "./App.css";
import { Country } from "./Types/CountryInterface";
import GroupedCountry from "./group-by-components/GroupedCountry";
import GroupByButtons from "./components/GroupByButtons";
import SelectionButtons from "./components/SelectionButtons";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SearchForm from "./components/SearchForm";
import { useCountryFunctions } from "./Hooks/useCountryFunctions";

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const {
    selectedCountries,
    latestSelectedCountry,
    filteredCountries,
    group,
    setGroup,
    handleCountryClick,
    handleSearch,
    handleSubmit,
    handleInputChange,
    searchTerm,
    setShowSelections,
    setSearchTerm,
    setLatestSelectedCountry,
    setSelectedCountries,
    getCountryStyle,
    showSelections,
  } = useCountryFunctions(data);

  if (loading)
    return (
      <div className="loading-container">
        <div className="custom-loader"></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const countries: Country[] = data.countries;

  return (
    <div className="app-container">
      <h1 className="header-title">Dataguess</h1>
      <h3 className="header-title">Jr Frontend Developer Assignment</h3>

      <div className="text-filter">
        <hr className="line-middle"></hr>
        <SearchForm
          searchTerm={searchTerm}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <p className="small-title">Group By</p>
        <GroupByButtons
          setGroup={setGroup}
          setShowSelections={setShowSelections}
          setSearchTerm={setSearchTerm}
        />
        <hr className="line-middle"></hr>
      </div>

      <div className="country-list">
        <SelectionButtons
          selectedCountries={selectedCountries}
          showSelections={showSelections}
          setShowSelections={setShowSelections}
          setGroup={setGroup}
          clearSelections={() => {
            setSelectedCountries([]);
            setLatestSelectedCountry(null);
            setShowSelections(false);
            setSearchTerm("");
            setGroup(0);
          }}
        />

        <GroupedCountry
          group={group}
          countries={countries}
          selectedCountries={selectedCountries}
          filteredCountries={filteredCountries}
          searchTerm={searchTerm}
          handleCountryClick={handleCountryClick}
          getCountryStyle={getCountryStyle}
          showSelections={showSelections}
          setLatestSelectedCountry={setLatestSelectedCountry}
          setSelectedCountries={setSelectedCountries}
        />
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
