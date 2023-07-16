import React from "react";
import './App.css';
import Navbar from './components/navbar/Navbar';
import Routers from '../src/routes/Router';
import Footer from "./components/footer/Footer";


function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <Routers />
      </div>
      <Footer />
    </div>
  );
}
export default App;
