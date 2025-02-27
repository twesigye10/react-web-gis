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
  const [locOptions, setLocOptions] = useState([]);
  const [attrOptions, setAttrOptions] = useState([]);
  const [filter, setFilter] = useState("");
  const [attrSelected, setAttrSelected] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setMapData(rehobothData);
    const locEntries = Array.from(
      new Set(rehobothData.features.map((feat) => feat.properties.location))
    );
    setLocOptions(locEntries);

    // init attribute options
    const initAttrEntries = Array.from(
      new Set(
        rehobothData.features.map(
          (feat) =>
            feat.properties[Object.keys(rehobothData.features[0].properties)[0]]
        )
      )
    );
    setAttrOptions(initAttrEntries);

    // init filtered data
    const initfilterChartData = rehobothData.features
      .map(
        (entry) =>
          entry.properties[Object.keys(rehobothData.features[0].properties)[0]]
      )
      .reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});

    // chart data
    setFilteredData(initfilterChartData);
  }, []);

  // Handle filter changes and update filtered data
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);

    const filtered = rehobothData.features.filter(
      (dataPoint) => dataPoint.properties[attrSelected] === selectedFilter
    );
    // supposed to update based on filters
    const filteredChartData = rehobothData.features
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
  // Handle attribute changes
  const handleAttrChange = (attr) => {
    setAttrSelected(attr);
    // handleFilterChange(filter);
    // updated attribute options
    const updatedAttrEntries = Array.from(
      new Set(rehobothData.features.map((feat) => feat.properties[attr]))
    );
    setAttrOptions(updatedAttrEntries);
    console.log(`Updated attribute: ${attr}`);
    console.log(`Updated options:`);
    console.log(updatedAttrEntries);

    // update data
    // const filtered = rehobothData.features.filter(
    //   (dataPoint) => dataPoint.properties[attr] === selectedFilter
    // );
    // supposed to update based on filters
    const filteredChartData = rehobothData.features
      .map((entry) => entry.properties[attr])
      .reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});

    // chart data
    setFilteredData(filteredChartData);

    // // map data
    // const filteredGeodata = {
    //   type: "FeatureCollection",
    //   name: "Rehoboth Job Card",
    //   features: filtered,
    // };
    // setMapData(filteredGeodata);
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
