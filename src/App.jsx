import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import MapComponent from "./MapComponent";
import rehobothData from "./assets/Rehoboth_Job_Card.json";
import DataFilter from "./DataFilter";
import ChartPanel from "./ChartPanel";
import SelectAttribute from "./SelectAttribute";

const App = () => {
  const [mapData, setMapData] = useState(rehobothData);
  const [attrSelected, setAttrSelected] = useState("");
  const [attrOptions, setAttrOptions] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // initialize map data
    setMapData(rehobothData);

    // initialize first attribute
    const firstAttribute = Object.keys(rehobothData.features[0].properties)[0];
    setAttrSelected(firstAttribute);

    // init attribute options
    const initAttrEntries = Array.from(
      new Set(
        rehobothData.features.map((feat) => feat.properties[firstAttribute])
      )
    );
    setAttrOptions(initAttrEntries);

    // init chart data
    const initfilterChartData = rehobothData.features
      .map((entry) => entry.properties[firstAttribute])
      .reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
    setFilteredData(initfilterChartData);
  }, []);

  // handle column/attribute changes

  const handleAttrChange = (attr) => {
    setAttrSelected(attr);
    // handleFilterChange(filter);
    // updated attribute options
    const updatedAttrEntries = Array.from(
      new Set(rehobothData.features.map((feat) => feat.properties[attr]))
    );
    setAttrOptions(updatedAttrEntries);
    // console.log(`Updated attribute: ${attr}`);
    // console.log(`Updated options:`);
    // console.log(updatedAttrEntries);

    // reset chart data based on selected attribute
    const filteredChartData = rehobothData.features
      .map((entry) => entry.properties[attr])
      .reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});

    // chart data
    setFilteredData(filteredChartData);

    // // rest map data || if data is colored based on column
    // const filteredGeodata = {
    //   type: "FeatureCollection",
    //   name: "Rehoboth Job Card",
    //   features: filtered,
    // };
    // setMapData(filteredGeodata);
  };

  // Handle filter changes and update filtered data
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);

    const filtered = rehobothData.features.filter((dataPoint) =>
      selectedFilter.includes(dataPoint.properties[attrSelected])
    );
    // supposed to update based on filters
    const filteredChartData = filtered
      .map((entry) => entry.properties[attrSelected])
      .reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});

    // chart data
    setFilteredData(filteredChartData);

    // map data
    const filteredGeodata = {
      type: "FeatureCollection",
      name: "Rehoboth Job Card",
      features: filtered,
    };
    setMapData(filteredGeodata);
    // console.log("====================================");
    // console.log(filteredGeodata);
    // console.log("====================================");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavBar />
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            width: "30vw",
            padding: "20px",
            backgroundColor: "#f4f4f4",
          }}
        >
          <SelectAttribute
            onAttrChange={handleAttrChange}
            originalData={rehobothData}
            selectedAttr={attrSelected}
          />
          <DataFilter
            onFilterChange={handleFilterChange}
            selectedFilter={filter}
            attrOptions={attrOptions}
          />
          <ChartPanel data={filteredData} />
        </div>
        <div style={{ flex: 1 }}>
          <MapComponent mapData={mapData} />
        </div>
      </div>
    </div>
  );
};

export default App;
