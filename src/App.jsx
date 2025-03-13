import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import MapComponent from "./MapComponent";
import rehobothData from "./assets/Rehoboth_Job_Card.json";
import DataFilter from "./DataFilter";
import ChartPanel from "./ChartPanel";
import SelectAttribute from "./SelectAttribute";

const App = () => {
  const [appData, setAppData] = useState({});
  const [surveyTool, setSurveyTool] = useState({});
  const [mapData, setMapData] = useState({});
  const [attrSelected, setAttrSelected] = useState("");
  const [attrOptions, setAttrOptions] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [attributeType, setAttributeType] = useState(null);
  const [sliderRange, setSliderRange] = useState({ min: 0, max: 100 });
  const [sliderStart, setSliderStart] = useState([20, 80]);
  const [sliderStep, setSliderStep] = useState(1);
  const [sliderMin, setSliderMin] = useState(null);
  const [sliderMax, setSliderMax] = useState(null);
  const numericTypes = ["integer", "decimal"];

  useEffect(() => {
    const fetchData = () =>
      fetch("http://localhost:3000/kobo-processed-data/2207253")
        .then((res) => res.json())
        .then((data) => {
          // check if data exists
          console.log(data);

          setAppData(data);
          setSurveyTool(data.survey);

          // after fetching data
          // initialize map data
          setMapData(data.geodata);

          // initialize first attribute
          const firstAttribute = Object.keys(
            data.geodata.features[0].properties
          )[0];
          setAttrSelected(firstAttribute);

          // set attribute type
          const currentAttributeType = data.survey.filter((question) => {
            if (question.label) {
              return question.label === firstAttribute;
            } else {
              return question.name === firstAttribute;
            }
          });
          const currentAttributeTypeValue = currentAttributeType[0].type;
          setAttributeType(currentAttributeTypeValue);
          console.log(`Attribute type: ${currentAttributeTypeValue}`);

          if (numericTypes.includes(currentAttributeTypeValue)) {
            const currNumAttrData = data.geodata.features.map(
              (feat) => feat.properties[firstAttribute]
            );
            const numAttrMin = Math.min(...currNumAttrData);
            const numAttrMax = Math.max(...currNumAttrData);
            // sliderRange;
            setSliderRange({ min: numAttrMin, max: numAttrMax });
            // sliderStart;
            setSliderStart([numAttrMin, numAttrMax]);
            // sliderStep;
            setSliderStep(1);
            // sliderMin;
            setSliderMin(numAttrMin);
            // sliderMax;
            setSliderMax(numAttrMax);
          }

          // init attribute options
          const initAttrEntries = Array.from(
            new Set(
              data.geodata.features.map(
                (feat) => feat.properties[firstAttribute]
              )
            )
          );
          setAttrOptions(initAttrEntries);

          // // init chart data
          // const initfilterChartData = data.geodata.features
          //   .map((entry) => entry.properties[firstAttribute])
          //   .reduce((acc, item) => {
          //     acc[item] = (acc[item] || 0) + 1;
          //     return acc;
          //   }, {});
          setFilteredData(data.geodata.features);
        });

    fetchData();
  }, []);

  // useEffect(() => {
  //   // initialize map data
  //   setMapData(appData.geodata);

  //   // initialize first attribute
  //   const firstAttribute = Object.keys(
  //     appData.geodata.features[0].properties
  //   )[0];
  //   setAttrSelected(firstAttribute);

  //   // init attribute options
  //   const initAttrEntries = Array.from(
  //     new Set(
  //       appData.geodata.features.map((feat) => feat.properties[firstAttribute])
  //     )
  //   );
  //   setAttrOptions(initAttrEntries);

  //   // init chart data
  //   const initfilterChartData = appData.geodata.features
  //     .map((entry) => entry.properties[firstAttribute])
  //     .reduce((acc, item) => {
  //       acc[item] = (acc[item] || 0) + 1;
  //       return acc;
  //     }, {});
  //   setFilteredData(initfilterChartData);
  // }, []);

  // handle column/attribute changes

  const handleAttrChange = (attr) => {
    setAttrSelected(attr);

    // set attribute type
    const currentAttributeType = appData.survey.filter((question) => {
      if (question.label) {
        return question.label === attr || question.name === attr;
      } else {
        return question.name === attr;
      }
    });

    const currentAttributeTypeValue = currentAttributeType[0].type;
    setAttributeType(currentAttributeTypeValue);
    console.log(`Attribute type: ${currentAttributeTypeValue}`);

    if (numericTypes.includes(currentAttributeTypeValue)) {
      const currNumAttrData = appData.geodata.features
        .map((feat) => feat.properties[attr])
        .filter((item) => !isNaN(item));
      const numAttrMin = Math.min(...currNumAttrData);
      const numAttrMax = Math.max(...currNumAttrData);
      // sliderRange;
      setSliderRange({ min: numAttrMin, max: numAttrMax });
      // sliderStart;
      setSliderStart([numAttrMin, numAttrMax]);
      // sliderStep;
      setSliderStep(1);
      // sliderMin;
      setSliderMin(numAttrMin);
      // sliderMax;
      setSliderMax(numAttrMax);
      console.log(`Attribute data: `);
      console.log(currNumAttrData);
      console.log(`Range: `);

      console.log(`Min: ${numAttrMin}`);
      console.log(`Max: ${numAttrMax}`);
    }

    // handleFilterChange(filter);
    // updated attribute options
    const updatedAttrEntries = Array.from(
      new Set(appData.geodata.features.map((feat) => feat.properties[attr]))
    );
    setAttrOptions(updatedAttrEntries);
    // console.log(`Updated attribute: ${attr}`);
    // console.log(`Updated options:`);
    // console.log(updatedAttrEntries);

    // // reset chart data based on selected attribute
    // const filteredChartData = appData.geodata.features
    //   .map((entry) => entry.properties[attr])
    //   .reduce((acc, item) => {
    //     acc[item] = (acc[item] || 0) + 1;
    //     return acc;
    //   }, {});

    // // chart data
    // setFilteredData(filteredChartData);

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

    const filtered = appData.geodata.features.filter((dataPoint) =>
      selectedFilter.includes(dataPoint.properties[attrSelected])
    );
    // // supposed to update based on filters
    // const filteredChartData = filtered
    //   .map((entry) => entry.properties[attrSelected])
    //   .reduce((acc, item) => {
    //     acc[item] = (acc[item] || 0) + 1;
    //     return acc;
    //   }, {});

    // chart data
    setFilteredData(filtered);

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
        {Object.keys(appData).length > 0 ? (
          <div
            style={{
              width: "30vw",
              padding: "20px",
              backgroundColor: "#f4f4f4",
            }}
          >
            <SelectAttribute
              onAttrChange={handleAttrChange}
              originalData={appData.geodata}
              selectedAttr={attrSelected}
            />
            {numericTypes.includes(attributeType) ? (
              <DataFilter
                onFilterChange={handleFilterChange}
                selectedFilter={filter}
                attrOptions={attrOptions}
                sliderRange={sliderRange}
                sliderStart={sliderStart}
                sliderStep={sliderStep}
              />
            ) : null}
            <ChartPanel data={filteredData} surveytool={surveyTool} />
          </div>
        ) : null}
        {Object.keys(mapData).length > 0 ? (
          <div style={{ flex: 1 }}>
            <MapComponent mapData={mapData} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
