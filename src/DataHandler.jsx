import React, { useState } from "react";
import DataFilter from "./DataFilter";

const DataHandler = ({ onFilterChange, filter, locOptions }) => {
  return (
    <div>
      <DataFilter
        onFilterChange={onFilterChange}
        selectedFilter={filter ? filter : ""}
        locOptions={locOptions}
      />
    </div>
  );
};

export default DataHandler;
