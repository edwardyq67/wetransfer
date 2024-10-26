import { useState } from "react";
import "./App.css";
import { HashRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Vista1 from "./components/Vista1";
import Vista2 from "./components/Vista2";
import NavBar from "./assets/navBar/NavBar";

function AppContent() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const ubicacion = pathname.split("/").pop().toUpperCase() || "HOME";
  return (
    <div className="flex h-screen max-w-[100vw]">
      
      <button
        onClick={() => setIsOpen(true)}
        className="text-white md:hidden w-10 bg-primario-500 rounded-r-md text-sm focus:outline-none"
      >
        <b className="-rotate-90 inline-block">{ubicacion}</b>
      </button>
      <div
        className={`fixed top-0 left-0 z-50 w-80 h-screen p-4 overflow-y-auto transition-transform bg-primario-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        <NavBar setIsOpen={setIsOpen} />
      </div>

      <div className="flex-1 flex bg-segundario-100 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/vista1" element={<Vista1 />} />
          <Route path="/vista2" element={<Vista2 />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
