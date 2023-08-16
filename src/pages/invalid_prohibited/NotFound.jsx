import React from "react";
import "./notFound.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <img
        src={"/frontend-service/lec-attendance-ui/images/404_error_img.png"}
        alt="Page Not Found"
        className="not-found-image"
      />
    </div>
  );
}

export default NotFound;
