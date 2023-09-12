import React from "react";
import { Country } from "../Types/CountryInterface";

interface LanguageGroupProps {
  countries: Country[];
  handleCountryClick: (country: Country) => void;
  getCountryStyle: (country: Country) => string;
}

function LanguageGroup({
  countries,
  handleCountryClick,
  getCountryStyle,
}: LanguageGroupProps) {
  const languageGroups: { [key: string]: Country[] } = {};

  countries.forEach((country) => {
    if (country.languages) {
      country.languages.forEach((language) => {
        const languageName = language.name;
        if (!languageGroups[languageName]) {
          languageGroups[languageName] = [];
        }
        languageGroups[languageName].push(country);
      });
    }
  });

  return (
    <div className="country-list">
      {Object.entries(languageGroups).map(([language, countriesInLanguage]) => (
        <div key={language}>
          <h2 className="header-title">{language}:</h2>
          <ul>
            {countriesInLanguage.map((country) => (
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
      ))}
    </div>
  );
}

export default LanguageGroup;
