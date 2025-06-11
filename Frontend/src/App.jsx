import "./index.css"; // TailwindCSS styles
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {showLogin} = useContext(AppContext)
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <ToastContainer position="bottom-right"/>
      <NavBar />
      {showLogin && <Login />} 
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-6 flex-grow bg-[#3f4454] text-gray-100">
        {/* This is the main App component that sets up the routing for the application. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy-credit" element={<BuyCredit />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;