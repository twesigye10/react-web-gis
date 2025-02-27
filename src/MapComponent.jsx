import React, { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = ({ mapData }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initMap = new maplibregl.Map({
      container: "map",
      style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      center: [17.08353797371501, -23.32222511955645], // [lng, lat]
      zoom: 13,
    });

    // initialize the map
    initMap.on("load", () => {
      setMap(initMap); // Only set the map when it’s fully loaded
      // add controls
      initMap.addControl(new maplibregl.ScaleControl(), "bottom-right");
      initMap.addControl(new maplibregl.FullscreenControl(), "bottom-right");
      initMap.addControl(new maplibregl.NavigationControl(), "bottom-right");
      initMap.addControl(new maplibregl.GeolocateControl(), "bottom-right");
    });

    return () => initMap.remove(); // cleaning up the map
  }, []);

  useEffect(() => {
    if (map) {
      // clear existing makers from the map
      const makersLayer = map.getLayer("markers");
      if (makersLayer) {
        map.removeLayer("markers");
        map.removeSource("markers");
      }

      //   add new data source
      map.addSource("markers", {
        type: "geojson",
        data: mapData,
      });

      //   add layer to the map
      map.addLayer({
        id: "markers",
        type: "circle",
        source: "markers",
        paint: { "circle-radius": 6, "circle-color": "#007cbf" },
      });

      //   add popup
      map.on("click", "markers", (e) => {
        const markerAttrs = e.features[0].properties;

        let content = '<div class="popup-content"><table>';
        for (const key in markerAttrs) {
          content += `<tr><th>${key}</th><td>${markerAttrs[key]}</td></tr>`;
        }
        content += "</table></div>";

        new maplibregl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`${content}`)
          .setMaxWidth("none")
          .addTo(map);
      });
    }
  }, [map, mapData]);

  return <div id="map" style={{ width: "70vw", height: "85vh" }} />;
};

export default MapComponent;
