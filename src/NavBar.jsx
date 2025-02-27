// src/NavBar.js
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>Extending geovisualizer</h2>
      </div>
      <div>
        <button
          onClick={() => alert("Settings clicked")}
          style={{
            padding: "10px",
            backgroundColor: "#444",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default NavBar;
