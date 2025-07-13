import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./Pages/User/Intro/Hero/Hero";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
