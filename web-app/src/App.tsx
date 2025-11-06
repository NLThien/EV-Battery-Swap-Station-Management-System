import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Stations from './pages/Stations/Stations';
// import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Account/Login';

import StationAdmin from './pages/StationAdmin/index';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} /> */}
            <Route path="/dashboard" element={<StationAdmin />} />
            <Route path="/about" element={<About />} />
            <Route path="/stations" element={<Stations />} />   // trang cho thằng bss staff
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
