import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Router from "./routes/Router";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <Router />
      </div>
    </div>
  );
}
export default App;
