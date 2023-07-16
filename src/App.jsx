import './App.css';
import CustomizedTables from './components/dashboard-table/dashboard-table';
// import Navbar from './components/navbar/Navbar';
// import Routers from './components/routers/Routers';

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        {/* <Navbar /> */}
        <CustomizedTables/>
        {/* <Routers /> */}
      </div>
    </div>
  );
}
export default App;
