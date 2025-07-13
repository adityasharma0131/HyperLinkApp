import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./Pages/User/Intro/Hero/Hero";
import Phone from "./Pages/User/Intro/Signin/Phoneno";
import Email from "./Pages/User/Intro/Signin/Email";
import Otp from "./Pages/User/Intro/OTP/Otp";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signin/phone" element={<Phone />} />
          <Route path="/signin/email" element={<Email />} />
          <Route path="/signin/:type/:credentials" element={<Otp />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
