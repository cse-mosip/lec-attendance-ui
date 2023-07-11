import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LectureConfig from './pages/lecture-config/lecture-config';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/lecture-config" element={<LectureConfig />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
