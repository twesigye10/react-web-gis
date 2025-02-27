import React from "react";
import Select from "react-select";

const DataFilter = ({ onFilterChange, selectedFilter, attrOptions }) => {
  const handleChange = (event) => {
    onFilterChange(event.target.value);
  };

  const currentOptions = attrOptions.map((entry) => (
    <option value={entry} key={entry}>
      {entry}
    </option>
  ));
  return (
    <div>
      <label>Select Option: </label>
      <select
        value={selectedFilter}
        key={"sel_options"}
        onChange={handleChange}
      >
        {currentOptions}
      </select>
    </div>
  );
};

export default DataFilter;
