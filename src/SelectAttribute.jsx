import React from "react";

function SelectAttribute({ onAttrChange, originalData, selectedAttr }) {
  function handleAttributeChange(event) {
    onAttrChange(event.target.value);
  }

  const firstFeat = originalData.features[0].properties;

  const currentAttributeOptions = Object.keys(firstFeat).map((entry) => (
    <option value={entry} key={entry}>
      {entry}
    </option>
  ));

  return (
    <div>
      <label>Select Attribute: </label>
      <select value={selectedAttr} onChange={handleAttributeChange}>
        {currentAttributeOptions}
      </select>
    </div>
  );
}

export default SelectAttribute;
