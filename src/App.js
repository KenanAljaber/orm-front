
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import CantPAge from './pages/CantPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cant' element={<CantPAge/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
