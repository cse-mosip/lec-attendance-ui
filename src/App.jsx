import './App.css';
import CustomizedTables from './components/dashboard-table/dashboard-table';
// import Navbar from './components/navbar/Navbar';
// import Routers from './components/routers/Routers';
import DashboardCard from "./components/card/dashboardCard";
import DashboardTable from "./components/dashboard-table/dashboard-table";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <DashboardCard />
        <DashboardTable />
      </div>
    </div>
  );
}
export default App;
