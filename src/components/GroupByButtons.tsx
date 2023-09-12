import React from "react";

interface GroupByButtonsProps {
  setGroup: (group: number) => void;
  setShowSelections: (show: boolean) => void;
}

function GroupByButtons({ setGroup, setShowSelections }: GroupByButtonsProps) {
  return (
    <div className="top-buttons">
      <button
        className="group-button"
        onClick={() => {
          setGroup(0);
          setShowSelections(false);
        }}
      >
        All
      </button>

      <button
        className="group-button"
        onClick={() => {
          setGroup(1);
          setShowSelections(false);
        }}
      >
        Language
      </button>
      <button
        className="group-button"
        onClick={() => {
          setGroup(2);
          setShowSelections(false);
        }}
      >
        Currency
      </button>
      <button
        className="group-button"
        onClick={() => {
          setGroup(3);
          setShowSelections(false);
        }}
      >
        Continent
      </button>
    </div>
  );
}

export default GroupByButtons;
