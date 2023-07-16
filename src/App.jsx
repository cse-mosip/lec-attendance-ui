import './App.css';
import Navbar from './components/navbar/Navbar';
import Routers from './components/routers/Routers';

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
         <Navbar />
         <Routers />
      </div>
    </div>
  );
}
export default App;
