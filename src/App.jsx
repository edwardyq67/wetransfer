import { useState } from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Vista1 from "./components/Vista1";
import Vista2 from "./components/Vista2";
import NavBar from "./assets/navBar/NavBar";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(true);
  };
  return (
    <HashRouter>
      <div className="flex h-screen">
        <button
          onClick={toggleDrawer}
          className="text-white  md:hidden block w-5 bg-primario-500 rounded-r-md text-sm  focus:outline-none "
        >
          <b className="-rotate-90 max-w-5  inline-block whitespace-nowrap"> Show drawer</b>
        </button>
        <div 
  className={`fixed top-0 left-0 z-50 w-80 h-screen p-4 overflow-y-auto transition-transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } bg-primario-500`}
>
<NavBar setIsOpen={setIsOpen}/> 
</div>
<div className="w-80 bg-primario-500 hidden md:block">
<NavBar setIsOpen={setIsOpen}/> 
</div>
        <div className=" flex flex-1 bg-segundario-100 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vista1" element={<Vista1 />} />
            <Route path="/vista2" element={<Vista2 />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;

// <div className="w-80 bg-primario-500">
// <button
//   onClick={toggleDrawer}
//   className="text-white bg-blue-700 hover:bg-blue-800  rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none "
// >
//   Show drawer
// </button>
{/* <div
  className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } bg-white w-80 dark:bg-gray-800`}
>

</div>
<NavBar />
</div> */}
