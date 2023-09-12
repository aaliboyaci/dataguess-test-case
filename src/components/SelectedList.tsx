import { Country } from "../Types/CountryInterface";

interface SelectedCountryListProps {
  selectedCountries: Country[];
  handleCountryClick: (country: Country) => void;
  getCountryStyle: (country: Country) => string;
}

function SelectedCountryList({
  selectedCountries,
  handleCountryClick,
  getCountryStyle,
}: SelectedCountryListProps) {
  return (
    <ul>
      {selectedCountries.map((country) => (
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
  );
}

export default SelectedCountryList;
