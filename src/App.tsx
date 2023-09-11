import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./queries/getCountries";
import "./components/Loading.css";
import "./App.css";
import React, { useState } from "react";

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="custom-loader"></div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  const countries = data.countries;

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
          {countries.map((country: any) => (
            <li key={country.code} className="country-item">
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
