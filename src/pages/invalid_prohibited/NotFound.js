import React from "react";

function NotFound() {
  return (
    <div style={{ textAlign: "left", marginLeft: "200px" }}>
      <h1
        style={{ fontWeight: "Bold", marginBottom: "30px", color: "#000000" }}
      >
        404 Not found
      </h1>
      <h3
        style={{
          fontWeight: "500",

          color: "#000000",
        }}
      >
        The requested url was not found
      </h3>
    </div>
  );
}

export default NotFound;
