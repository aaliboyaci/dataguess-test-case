import React from "react";

interface SearchFormProps {
  searchTerm: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function SearchForm({
  searchTerm,
  handleInputChange,
  handleSubmit,
}: SearchFormProps) {
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="eg. search bra ,  group continent"
      />
      <button className="search-button" type="submit">
        Search
      </button>
      <p className="input-description">
        example queries= search ger, group currency, group language
      </p>
    </form>
  );
}

export default SearchForm;
