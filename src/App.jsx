import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AutoScroll from "./Components/AutoScroll";

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

import AddLocation from "./Pages/User/Application/Vaccination/AddLocation";
import LabTestAddLocation from "./Pages/User/Application/LabTest/AddLocation";

import Vaccination from "./Pages/User/Application/Vaccination/Vaccination";
import ChildVaccination from "./Pages/User/Application/Vaccination/ChildVaccination";
import AdultVaccination from "./Pages/User/Application/Vaccination/AdultVaccination";
import TravelVaccination from "./Pages/User/Application/Vaccination/TravelVaccination";
import DetailsVaccination from "./Pages/User/Application/Vaccination/PersonalDetails";
import QuestionnairesVaccination from "./Pages/User/Application/Vaccination/Questionnaires";
import QuestionnairesOrderSummary from "./Pages/User/Application/Vaccination/OrderSummary";

import HomeCounselling from "./Pages/User/Application/Counselling/Home";
import DetailsCounselling from "./Pages/User/Application/Counselling/PersonalDetails";
import QuestionnairesCounselling from "./Pages/User/Application/Counselling/Questionnaires";
import ResultCounselling from "./Pages/User/Application/Counselling/Result";

import ConsultationHome from "./Pages/User/Application/Consultation/Home";
import ConsultationDoctorList from "./Pages/User/Application/Consultation/DoctorList";
import ConsultationDoctorProfiile from "./Pages/User/Application/Consultation/DoctorProfile";
import ConsultationScheduling from "./Pages/User/Application/Consultation/Scheduling";
import ConsultationOrderSummary from "./Pages/User/Application/Consultation/OrderSummary";
import SubscriptionHome from "./Pages/User/Application/Subscription/Home";
import SubscriptionSummary from "./Pages/User/Application/Subscription/Summary";

import SleepIntro from "./Pages/User/Application/Sleep/Intro";
import SleepUserInfo from "./Pages/User/Application/Sleep/UserInfo";
import SleepHome from "./Pages/User/Application/Sleep/Home";
import SleepGoal from "./Pages/User/Application/Sleep/SleepGoal";
import SleepRecord from "./Pages/User/Application/Sleep/SleepRecord";

import LabTestHome from "./Pages/User/Application/LabTest/Home";
import LabTestList from "./Pages/User/Application/LabTest/TestList";
import LabTestTest from "./Pages/User/Application/LabTest/Test";
import LabTestCart from "./Pages/User/Application/LabTest/LabtestCart";

import PersonaAbout from "./Pages/User/Application/Persona Builder/About";
import PersonaPhysicalActivity from "./Pages/User/Application/Persona Builder/PhysicalActivity";
import PersonaNutrition from "./Pages/User/Application/Persona Builder/Nutrition";
import PersonaSleep from "./Pages/User/Application/Persona Builder/SleepInfo";
import PersonaMedicalCondition from "./Pages/User/Application/Persona Builder/MedicalCondition";

import Testing from "./Pages/User/Application/LabTest/Testing";

function App() {
  return (
    <Router>
      <main>
        <AutoScroll />

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
          <Route
            path="/app/vaccination/travel"
            element={<TravelVaccination />}
          />
          <Route
            path="/app/vaccination/details"
            element={<DetailsVaccination />}
          />
          <Route
            path="/app/vaccination/questionnaires"
            element={<QuestionnairesVaccination />}
          />
          <Route
            path="/app/vaccination/order-summary"
            element={<QuestionnairesOrderSummary />}
          />
          <Route path="/app/user/add-location" element={<AddLocation />} />

          <Route path="/app/counselling/home" element={<HomeCounselling />} />
          <Route
            path="/app/counselling/details"
            element={<DetailsCounselling />}
          />
          <Route
            path="/app/counselling/questionnaires"
            element={<QuestionnairesCounselling />}
          />
          <Route
            path="/app/counselling/result"
            element={<ResultCounselling />}
          />
          <Route path="/app/consultation" element={<ConsultationHome />} />
          <Route
            path="/app/consultation/doctors-list"
            element={<ConsultationDoctorList />}
          />
          <Route
            path="/app/consultation/doctor-profile"
            element={<ConsultationDoctorProfiile />}
          />
          <Route
            path="/app/consultation/scheduling"
            element={<ConsultationScheduling />}
          />
          <Route
            path="/app/consultation/order-summary"
            element={<ConsultationOrderSummary />}
          />
          <Route path="/app/subscription/" element={<SubscriptionHome />} />
          <Route
            path="/app/subscription/summary"
            element={<SubscriptionSummary />}
          />
          <Route path="/app/sleep/intro" element={<SleepIntro />} />
          <Route path="/app/sleep/user-info" element={<SleepUserInfo />} />
          <Route path="/app/sleep" element={<SleepHome />} />
          <Route path="/app/sleep/goal" element={<SleepGoal />} />
          <Route path="/app/sleep/record" element={<SleepRecord />} />

          <Route path="/app/lab-test" element={<LabTestHome />} />
          <Route path="/app/lab-test/test-list" element={<LabTestList />} />
          <Route path="/app/lab-test/test" element={<LabTestTest />} />
          <Route path="/app/lab-test/test/cart" element={<LabTestCart />} />
          <Route
            path="/app/user/lab-test/add-location"
            element={<LabTestAddLocation />}
          />

          <Route path="/app/persona-builder/about" element={<PersonaAbout />} />
          <Route
            path="/app/persona-builder/physical-activity"
            element={<PersonaPhysicalActivity />}
          />
          <Route
            path="/app/persona-builder/nutrition"
            element={<PersonaNutrition />}
          />
          <Route path="/app/persona-builder/sleep" element={<PersonaSleep />} />
          <Route
            path="/app/persona-builder/medical-condition"
            element={<PersonaMedicalCondition />}
          />

          <Route path="/app/testing" element={<Testing />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
