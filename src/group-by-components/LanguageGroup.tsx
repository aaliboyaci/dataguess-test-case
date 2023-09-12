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
  return (
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
            <div className="country-capital">{country.language}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default LanguageGroup;
