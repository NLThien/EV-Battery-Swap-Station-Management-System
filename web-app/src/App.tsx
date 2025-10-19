import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import {StationDetail} from '../src/pages/Stations/StationDetail';
import Home from './pages/HomePage';
import About from './pages/About/About';
import Login from './pages/Account/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/stationDetail" element={<StationDetail />} />   // trang xem thông số trạm
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
