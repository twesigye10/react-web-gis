import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const DataFilter = ({ onFilterChange, selectedFilter, attrOptions }) => {
  // State to track selected filters
  const [sldFilters, setSldFilters] = useState([]);

  const handleChange = (selected) => {
    const selectedOpts = selected.map((opt) => opt.value);

    setSldFilters(selectedOpts);
    onFilterChange(selectedOpts);
  };

  const currentOptions = attrOptions.map((entry) => ({
    label: entry,
    value: entry,
  }));
  return (
    <div>
      <label>
        Select Options:
        <MultiSelect
          options={currentOptions}
          key={"sel_options"}
          value={currentOptions.filter((option) =>
            sldFilters.includes(option.value)
          )}
          onChange={handleChange}
          labelledBy="Select"
        />
      </label>
    </div>
  );
};

export default DataFilter;
