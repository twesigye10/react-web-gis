import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Nouislider from "nouislider-react"; // https://github.com/mmarkelov/react-nouislider
import "nouislider/distribute/nouislider.css";

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
      {/* Multi select */}
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
      {/* numeric selections */}
      <Nouislider
        range={{ min: 0, max: 100 }}
        start={[20, 80]}
        connect={true}
        tooltips={true}
        step={1}
        onChange={(values) => {
          console.log(values);
        }}
      />
    </div>
  );
};

export default DataFilter;
