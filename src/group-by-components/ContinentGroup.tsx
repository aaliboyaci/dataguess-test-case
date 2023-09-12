import React from "react";
import { Country } from "../Types/CountryInterface";

interface ContinentGroupProps {
  countries: Country[];
  handleCountryClick: (country: Country) => void;
  getCountryStyle: (country: Country) => string;
}

function ContinentGroup({
  countries,
  handleCountryClick,
  getCountryStyle,
}: ContinentGroupProps) {
  const continentGroups: { [key: string]: Country[] } = {};

  countries.forEach((country) => {
    if (country.continent && country.continent.name) {
      const continentName = country.continent.name;
      if (!continentGroups[continentName]) {
        continentGroups[continentName] = [];
      }
      continentGroups[continentName].push(country);
    }
  });

  return (
    <div className="country-list">
      {Object.entries(continentGroups).map(
        ([continent, countriesInContinent]) => (
          <div key={continent}>
            <h2 className="header-title">{continent}:</h2>
            <ul>
              {countriesInContinent.map((country) => (
                <li
                  key={country.code}
                  onClick={() => handleCountryClick(country)}
                  className={getCountryStyle(country)}
                >
                  <div className="country-group-emoji">{country.emoji}</div>
                  <div className="country-info">
                    <div className="country-name">
                      {country.name.substring(0, 30)}
                      {country.name.length > 30 && <>...</>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

export default ContinentGroup;
