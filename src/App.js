import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Index, Solutions } from "./Days/Index";

function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <Link  to={"/"}>Home</Link>
        <Routes>
          <Route path="solutions/*" element={<Solutions/>}/>
          <Route path="/" element={<Index/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
