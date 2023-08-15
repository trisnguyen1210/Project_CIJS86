import { useState } from "react";
import Login from "./Components/Login";
import "./App.css";
import HomePage from "./Components/HomePage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="background">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
