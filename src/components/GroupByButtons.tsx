import React from "react";

interface GroupByButtonsProps {
  setGroup: (group: number) => void;
  setShowSelections: (show: boolean) => void;
  setSearchTerm: (query: string) => void;
}

function GroupByButtons({
  setGroup,
  setShowSelections,
  setSearchTerm,
}: GroupByButtonsProps) {
  return (
    <div className="top-buttons">
      <button
        className="group-button"
        onClick={() => {
          setSearchTerm("");
          setGroup(0);
          setShowSelections(false);
        }}
      >
        All
      </button>

      <button
        className="group-button"
        onClick={() => {
          setSearchTerm("");
          setGroup(1);
          setShowSelections(false);
        }}
      >
        Language
      </button>
      <button
        className="group-button"
        onClick={() => {
          setShowSelections(false);
          setSearchTerm("");
          setGroup(2);
        }}
      >
        Currency
      </button>
      <button
        className="group-button"
        onClick={() => {
          setShowSelections(false);
          setSearchTerm("");
          setGroup(3);
        }}
      >
        Continent
      </button>
    </div>
  );
}

export default GroupByButtons;
