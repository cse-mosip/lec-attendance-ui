import './App.css';
import Navbar from './components/navbar/Navbar';
import Routers from './routes/Routers';

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
