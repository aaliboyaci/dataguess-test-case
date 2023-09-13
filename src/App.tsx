import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "./queries/getCountries";
import "./components/Loading.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Country } from "./Types/CountryInterface";
import GroupedCountry from "./group-by-components/GroupedCountry";
import GroupByButtons from "./components/GroupByButtons";
import SelectionButtons from "./components/SelectionButtons";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SearchForm from "./components/SearchForm";

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

  const selectLast = (filteredCountries: Country[]) => {
    if (filteredCountries.length !== 0 && searchTerm !== "") {
      const newCountry = filteredCountries[filteredCountries.length - 1];
      if (!selectedCountries.some((c) => c.code === newCountry.code)) {
        setSelectedCountries([...selectedCountries, newCountry]);
        setLatestSelectedCountry(newCountry);
      }
    }
  };

  useEffect(() => {
    selectLast(filteredCountries);
  }, [filteredCountries]);

  const parseSearchQuery = (query: string) => {
    const searchMatch = query.match(/search ([^"]+)/);
    const groupMatch = query.match(/group ([^"]+)/);

    const search = searchMatch ? searchMatch[1] : "";
    const group = groupMatch ? groupMatch[1].toLowerCase() : "";

    return { search, group };
  };

  const handleSearch = (query: string) => {
    const { search, group } = parseSearchQuery(query);

    switch (group) {
      case "language":
        setGroup(1);
        break;
      case "currency":
        setGroup(2);
        break;
      case "continent":
        setGroup(3);
        break;
      default:
        setGroup(0);
    }

    const filtered = data.countries.filter((country: Country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchTerm);
    selectLast(filteredCountries);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSelections(false);
    setGroup(0);
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
        <hr className="line-middle"></hr>
        <SearchForm
          searchTerm={searchTerm}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <p className="small-title">Group By</p>
        <GroupByButtons
          setGroup={setGroup}
          setShowSelections={setShowSelections}
          setSearchTerm={setSearchTerm}
        />
        <hr className="line-middle"></hr>
      </div>

      <div className="country-list">
        <SelectionButtons
          selectedCountries={selectedCountries}
          showSelections={showSelections}
          setShowSelections={setShowSelections}
          setGroup={setGroup}
          clearSelections={() => {
            setSelectedCountries([]);
            setLatestSelectedCountry(null);
            setShowSelections(false);
            setSearchTerm("");
            setGroup(0);
          }}
        />

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
      <ScrollToTopButton />
    </div>
  );
}

export default App;
