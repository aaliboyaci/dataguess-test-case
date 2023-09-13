import React, { useEffect } from "react";
import { Country } from "../Types/CountryInterface";

interface CurrencyGroupProps {
  countries: Country[];
  handleCountryClick: (country: Country) => void;
  getCountryStyle: (country: Country) => string;
  setSelectedCountries: (country: Country[]) => void;
  setLatestSelectedCountry: (country: Country | null) => void;
  selectedCountries: Country[];
}

function CurrencyGroup({
  countries,
  handleCountryClick,
  getCountryStyle,
  setLatestSelectedCountry,
  setSelectedCountries,
  selectedCountries,
}: CurrencyGroupProps) {
  const currencyGroups: { [key: string]: Country[] } = {};

  countries.forEach((country) => {
    const currencyName = country.currency;
    if (currencyName !== null) {
      if (!currencyGroups[currencyName]) {
        currencyGroups[currencyName] = [];
      }
      currencyGroups[currencyName].push(country);
    }
  });
  useEffect(() => {
    const newCountry = currencyGroups?.EUR[9];
    if (!selectedCountries.some((c) => c.code === newCountry.code)) {
      setSelectedCountries([...selectedCountries, newCountry]);
      setLatestSelectedCountry(newCountry);
    }
  }, []);

  return (
    <div className="country-list">
      {Object.entries(currencyGroups).map(
        ([currency, countriesWithCurrency]) => (
          <div key={currency}>
            <h2 className="header-title">{currency.substring(0, 10)}:</h2>
            <ul>
              {countriesWithCurrency.map((country) => (
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

export default CurrencyGroup;
