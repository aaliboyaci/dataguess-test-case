import { useState, useEffect } from "react";
import { Country } from "../Types/CountryInterface";

interface Data {
  countries: Country[];
}

export function useCountryFunctions(data: Data | undefined) {
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

    const filtered = data?.countries.filter((country: Country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filtered || []);
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

  return {
    selectedCountries,
    latestSelectedCountry,
    filteredCountries,
    group,
    setGroup,
    handleCountryClick,
    handleSearch,
    handleSubmit,
    handleInputChange,
    searchTerm,
    setShowSelections,
    setSearchTerm,
    setLatestSelectedCountry,
    setSelectedCountries,
    getCountryStyle,
    showSelections,
  };
}
