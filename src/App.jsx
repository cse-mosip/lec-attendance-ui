import React from "react";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Router from './routes/Router';
import Footer from "./components/footer/Footer";


function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        {/* <Navbar /> */}
        <Router />
      </div>
      <Footer />
    </div>
  );
}
export default App;
