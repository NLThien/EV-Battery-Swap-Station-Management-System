import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import Stations from "./pages/Stations/Stations";
// import Home from "./pages/Home/HomePage";
// import About from "./pages/About/About";
// import Login from "./pages/Account/Login";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/stations" element={<Stations />} /> // trang cho thằng
//             bss staff
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }
function App() {
  return (
    <div className="App">
      <DashboardLayout></DashboardLayout>
    </div>
  );
}

export default App;
