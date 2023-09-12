import React from "react";
import { Country } from "../Types/CountryInterface";

interface SelectionButtonsProps {
  selectedCountries: Country[];
  showSelections: boolean;
  setShowSelections: (show: boolean) => void;
  setGroup: (group: number) => void;
  clearSelections: () => void;
}

const SelectionButtons: React.FC<SelectionButtonsProps> = ({
  selectedCountries,
  showSelections,
  setShowSelections,
  setGroup,
  clearSelections,
}) => {
  return (
    <div className="top-buttons">
      <button className="remove-button" onClick={clearSelections}>
        Clear Selections ({selectedCountries.length})
      </button>
      <button
        className={
          selectedCountries.length !== 0
            ? "show-selections-button"
            : "show-selections-button-disable"
        }
        onClick={() => {
          if (selectedCountries.length !== 0) {
            setShowSelections(!showSelections);
            setGroup(showSelections ? 0 : 4);
          } else {
            setShowSelections(false);
            setGroup(4);
          }
        }}
      >
        {showSelections ? "Close" : "Show"} Selections (
        {selectedCountries.length})
      </button>
    </div>
  );
};

export default SelectionButtons;
