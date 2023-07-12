import React from "react";
import "./notFound.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <img
        src={process.env.PUBLIC_URL + "images/404_error_img.png"}
        alt="Page Not Found"
        className="not-found-image"
      />
    </div>
  );
}

export default NotFound;
