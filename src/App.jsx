import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./Pages/User/Intro/Hero/Hero";
import Phone from "./Pages/User/Intro/Signin/Phoneno";
import Email from "./Pages/User/Intro/Signin/Email";
import Otp from "./Pages/User/Intro/OTP/Otp";
import UserInfo from "./Pages/User/Intro/UserInfo/UserInfo";
import UserLocation from "./Pages/User/Intro/UserInfo/UserLocation";

import UserHome from "./Pages/User/Application/Home/Home";
import UserServices from "./Pages/User/Application/Services/Services";
import UserHyperLink from "./Pages/User/Application/HyperLink/HyperLink";
import UserHealthFeeds from "./Pages/User/Application/HealthFeeds/HealthFeeds";
import UserProfile from "./Pages/User/Application/Profile/Profile";
import Vaccination from "./Pages/User/Application/Vaccination/Vaccination";
import ChildVaccination from "./Pages/User/Application/Vaccination/ChildVaccination";
import AdultVaccination from "./Pages/User/Application/Vaccination/AdultVaccination";
import TravelVaccination from "./Pages/User/Application/Vaccination/TravelVaccination";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signin/phone" element={<Phone />} />
          <Route path="/signin/email" element={<Email />} />
          <Route path="/signin/:type/:credentials" element={<Otp />} />
          <Route path="/signin/:userid" element={<UserInfo />} />
          <Route path="/signin/location/:userid" element={<UserLocation />} />

          <Route path="/app" element={<UserHome />} />
          <Route path="/app/services" element={<UserServices />} />
          <Route path="/app/hyperlink360" element={<UserHyperLink />} />
          <Route path="/app/healthfeeds" element={<UserHealthFeeds />} />
          <Route path="/app/profile" element={<UserProfile />} />

          <Route path="/app/vaccination" element={<Vaccination />} />
          <Route path="/app/vaccination/child" element={<ChildVaccination />} />
          <Route path="/app/vaccination/adult" element={<AdultVaccination />} />
          <Route path="/app/vaccination/travel" element={<TravelVaccination/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
