import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./queries/getCountries";
import "./components/Loading.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Country } from "./Types/CountryInterface";
import GroupedCountry from "./group-by-components/GroupedCountry";
import GroupByButtons from "./components/GroupByButtons";

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [latestSelectedCountry, setLatestSelectedCountry] =
    useState<Country | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [showSelections, setShowSelections] = useState<boolean>(false);
  const [group, setGroup] = useState<number>(0);

  useEffect(() => {
    if (data && data.countries && data.countries.length >= 10) {
      setSelectedCountries([data.countries[9]]);
      setLatestSelectedCountry(data.countries[9]);
    }
  }, [data]);

  useEffect(() => {
    if (filteredCountries.length !== 0 && searchTerm !== "") {
      const newCountry = filteredCountries[filteredCountries.length - 1];
      if (!selectedCountries.some((c) => c.code === newCountry.code)) {
        setSelectedCountries([...selectedCountries, newCountry]);
        setLatestSelectedCountry(newCountry);
      }
    }
  }, [filteredCountries]);

  useEffect(() => {
    if (data && data.countries && searchTerm !== "") {
      const filtered = data.countries.filter((country: Country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [data, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSelections(false);
    setGroup(0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCountryClick = (country: Country) => {
    if (selectedCountries.some((c) => c === country)) {
      if (latestSelectedCountry === country) {
        selectedCountries.length === 1
          ? setLatestSelectedCountry(null)
          : setLatestSelectedCountry(
              selectedCountries[selectedCountries.length - 2]
            );
      }
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
      setLatestSelectedCountry(country);
    }
  };

  const getCountryStyle = (country: Country) => {
    if (
      selectedCountries.some((c) => c === country) &&
      latestSelectedCountry !== country
    ) {
      return "selected-country-item";
    } else if (latestSelectedCountry === country) {
      return "latest-selected-country-item";
    } else {
      return "country-item";
    }
  };

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
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search-input"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a country"
          />
        </form>
        <p className="small-title">Group By</p>
        <GroupByButtons
          setGroup={setGroup}
          setShowSelections={setShowSelections}
        />
        <hr className="line-middle"></hr>
      </div>

      <div className="country-list">
        <div className="top-buttons">
          <button
            className="remove-button"
            onClick={() => {
              setSelectedCountries([]);
              setLatestSelectedCountry(null);
              setShowSelections(false);
              setSearchTerm("");
              setGroup(0);
            }}
          >
            Clear Selections ({selectedCountries.length})
          </button>
          <button
            className={
              selectedCountries.length !== 0
                ? "show-selections-button"
                : "show-selections-button-disable"
            }
            onClick={() => {
              if (selectedCountries.length !== 0) {
                setShowSelections(!showSelections);
                setGroup(showSelections ? 0 : 4);
              } else {
                setShowSelections(false);
                setGroup(4);
              }
            }}
          >
            {showSelections ? "Close" : "Show"} Selections (
            {selectedCountries.length})
          </button>
        </div>

        <GroupedCountry
          group={group}
          countries={countries}
          selectedCountries={selectedCountries}
          filteredCountries={filteredCountries}
          searchTerm={searchTerm}
          handleCountryClick={handleCountryClick}
          getCountryStyle={getCountryStyle}
          showSelections={showSelections}
        />
      </div>
      {filteredCountries.length >= 10 ||
        (data.countries.length >= 10 && (
          <button
            className="goto-top-button"
            onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
          >
            Go to top
          </button>
        ))}
    </div>
  );
}

export default App;
