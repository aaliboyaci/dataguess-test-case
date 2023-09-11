import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./queries/getCountries";
import "./components/Loading.css";
import "./App.css";
import React, { useState } from "react";

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
        <ul>
          {countries.map((country) => (
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
                <div className="country-capital">{country.capital}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
