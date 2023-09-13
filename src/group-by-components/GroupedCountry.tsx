import React from "react";
import { Country } from "../Types/CountryInterface";
import CountryList from "../components/CountryList";
import LanguageGroup from "./LanguageGroup";
import CurrencyGroup from "./CurrencyGroup";
import ContinentGroup from "./ContinentGroup";
import SelectedCountryList from "../components/SelectedList";

interface GroupedCountryProps {
  group: number;
  countries: Country[];
  selectedCountries: Country[];
  filteredCountries: Country[];
  searchTerm: string;
  handleCountryClick: (country: Country) => void;
  getCountryStyle: (country: Country) => string;
  showSelections: boolean;
  setSelectedCountries: (country: Country[]) => void;
  setLatestSelectedCountry: (country: Country | null) => void;
}

function renderCountryList(
  countries: Country[],
  handleCountryClick: (country: Country) => void,
  getCountryStyle: (country: Country) => string
) {
  return (
    <CountryList
      countries={countries}
      handleCountryClick={handleCountryClick}
      getCountryStyle={getCountryStyle}
    />
  );
}

function renderLanguageGroup(
  countries: Country[],
  handleCountryClick: (country: Country) => void,
  getCountryStyle: (country: Country) => string,
  setSelectedCountries: (country: Country[]) => void,
  setLatestSelectedCountry: (country: Country | null) => void,
  selectedCountries: Country[]
) {
  return (
    <LanguageGroup
      countries={countries}
      handleCountryClick={handleCountryClick}
      getCountryStyle={getCountryStyle}
      setSelectedCountries={setSelectedCountries}
      setLatestSelectedCountry={setLatestSelectedCountry}
      selectedCountries={selectedCountries}
    />
  );
}

function renderSelectedCountryList(
  selectedCountries: Country[],
  handleCountryClick: (country: Country) => void,
  getCountryStyle: (country: Country) => string
) {
  return (
    <SelectedCountryList
      selectedCountries={selectedCountries}
      handleCountryClick={handleCountryClick}
      getCountryStyle={getCountryStyle}
    />
  );
}

function renderCurrencyGroup(
  countries: Country[],
  handleCountryClick: (country: Country) => void,
  getCountryStyle: (country: Country) => string,
  setSelectedCountries: (country: Country[]) => void,
  setLatestSelectedCountry: (country: Country | null) => void,
  selectedCountries: Country[]
) {
  return (
    <CurrencyGroup
      countries={countries}
      handleCountryClick={handleCountryClick}
      getCountryStyle={getCountryStyle}
      setSelectedCountries={setSelectedCountries}
      setLatestSelectedCountry={setLatestSelectedCountry}
      selectedCountries={selectedCountries}
    />
  );
}

function renderContinentGroup(
  countries: Country[],
  handleCountryClick: (country: Country) => void,
  getCountryStyle: (country: Country) => string,
  setSelectedCountries: (country: Country[]) => void,
  setLatestSelectedCountry: (country: Country | null) => void,
  selectedCountries: Country[]
) {
  return (
    <ContinentGroup
      countries={countries}
      handleCountryClick={handleCountryClick}
      getCountryStyle={getCountryStyle}
      setSelectedCountries={setSelectedCountries}
      setLatestSelectedCountry={setLatestSelectedCountry}
      selectedCountries={selectedCountries}
    />
  );
}

function GroupedCountry({
  group,
  countries,
  selectedCountries,
  filteredCountries,
  searchTerm,
  showSelections,
  handleCountryClick,
  getCountryStyle,
  setSelectedCountries,
  setLatestSelectedCountry,
}: GroupedCountryProps) {
  let content;

  switch (group) {
    case 0:
      content =
        searchTerm === ""
          ? renderCountryList(countries, handleCountryClick, getCountryStyle)
          : renderCountryList(
              filteredCountries,
              handleCountryClick,
              getCountryStyle
            );
      break;
    case 1:
      content = renderLanguageGroup(
        countries,
        handleCountryClick,
        getCountryStyle,
        setSelectedCountries,
        setLatestSelectedCountry,
        selectedCountries
      );
      break;
    case 2:
      content = renderCurrencyGroup(
        countries,
        handleCountryClick,
        getCountryStyle,
        setSelectedCountries,
        setLatestSelectedCountry,
        selectedCountries
      );
      break;
    case 3:
      content = renderContinentGroup(
        countries,
        handleCountryClick,
        getCountryStyle,
        setSelectedCountries,
        setLatestSelectedCountry,
        selectedCountries
      );
      break;
    case 4:
      content =
        showSelections &&
        renderSelectedCountryList(
          selectedCountries,
          handleCountryClick,
          getCountryStyle
        );
      break;
    default:
      content = null;
  }

  return <div>{content}</div>;
}

export default GroupedCountry;
