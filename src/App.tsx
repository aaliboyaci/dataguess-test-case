import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./queries/getCountries";
import "./components/Loading.css";
import "./App.css";
import React, { useEffect, useState } from "react";

interface Country {
  code: string;
  name: string;
  emoji: string;
  capital: string;
}

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [latestSelectedCountry, setLatestSelectedCountry] =
    useState<Country | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  useEffect(() => {
    if (data && data.countries && data.countries.length >= 10) {
      setSelectedCountries([data.countries[9]]);
      setLatestSelectedCountry(data.countries[9]);
    }
  }, [data]);

  useEffect(() => {
    if (filteredCountries.length !== 0 && searchTerm !== "") {
      setSelectedCountries([
        ...selectedCountries,
        filteredCountries[filteredCountries.length - 1],
      ]);
      setLatestSelectedCountry(filteredCountries[filteredCountries.length - 1]);
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
  console.log(filteredCountries[filteredCountries.length - 1]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
      <h3 className="header-tite">Jr Frontend Developer Assignment</h3>
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
      </div>

      <div className="country-list">
        <button
          className="remove-button"
          onClick={() => {
            setSelectedCountries([]);
            setLatestSelectedCountry(null);
          }}
        >
          Clear Selections ({selectedCountries.length})
        </button>
        <ul>
          {searchTerm === "" &&
            countries.map((country) => (
              <li
                key={country.code}
                onClick={() => handleCountryClick(country)}
                className={getCountryStyle(country)}
              >
                <div className="country-emoji">{country.emoji}</div>
                <div className="country-info">
                  <div className="country-name">
                    {country.name.substring(0, 30)}
                    {country.name.length > 30 && <>...</>}
                  </div>
                  <div className="country-capital">
                    {country.code} {country.capital}
                  </div>
                </div>
              </li>
            ))}

          {searchTerm !== "" &&
            filteredCountries.map((country) => (
              <li
                key={country.code}
                onClick={() => handleCountryClick(country)}
                className={getCountryStyle(country)}
              >
                <div className="country-emoji">{country.emoji}</div>
                <div className="country-info">
                  <div className="country-name">
                    {country.name.substring(0, 30)}
                    {country.name.length > 30 && <>...</>}
                  </div>
                  <div className="country-capital">
                    {country.code} {country.capital}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {filteredCountries.length >= 10 && (
        <button
          className="goto-top-button"
          onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
        >
          Go to top
        </button>
      )}
    </div>
  );
}

export default App;
