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
import UserHealthFeeds from "./Pages/User/Application/HealthFeeds/HealthFeeds";
import UserProfile from "./Pages/User/Application/Profile/Profile";

import PrescriptionUpload from "./Pages/User/Application/Prescription/UploadPrescription";

import UserHyperLink from "./Pages/User/Application/HyperLink/HyperLink";
import HyperLinkUploadReports from "./Pages/User/Application/HyperLink/UploadReports";
import HyperLinkViewReport from "./Pages/User/Application/HyperLink/ViewReport";

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

import NutritionIntro from "./Pages/User/Application/Nutrition/Intro";
import NutritionHome from "./Pages/User/Application/Nutrition/Home";
import NutritionSetGoal from "./Pages/User/Application/Nutrition/SetGoal";
import NutritionDietDash from "./Pages/User/Application/Nutrition/DietDash";
import NutritionAddDiet from "./Pages/User/Application/Nutrition/AddDiet";
import NutritionScan from "./Pages/User/Application/Nutrition/Scan";

import PhysicalIntro from "./Pages/User/Application/Physical/Intro";
import PhysicalHome from "./Pages/User/Application/Physical/Home";
import PhysicalSetGoal from "./Pages/User/Application/Physical/SetGoal";
import PhysicalAddActivity from "./Pages/User/Application/Physical/AddActivity";
import PhysicalActivityDetail from "./Pages/User/Application/Physical/ActivityDetail";

import WellnessHome from "./Pages/User/Application/Wellness/Home";

import HealthRecordsHome from "./Pages/User/Application/Health Records/Home";
import HealthRecordsDirectoryList from "./Pages/User/Application/Health Records/DirectoryList";
import HealthRecordsSingleDirectory from "./Pages/User/Application/Health Records/SingleDirectory";
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

          <Route path="/app/healthfeeds" element={<UserHealthFeeds />} />
          <Route path="/app/profile" element={<UserProfile />} />

          <Route path="/app/hyperlink360" element={<UserHyperLink />} />
          <Route
            path="/app/hyperlink360/upload-reports"
            element={<HyperLinkUploadReports />}
          />
          <Route
            path="/app/hyperlink360/view-report"
            element={<HyperLinkViewReport />}
          />

          <Route
            path="/app/prescription/upload-prescription"
            element={<PrescriptionUpload />}
          />

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

          <Route path="/app/nutrition/intro" element={<NutritionIntro />} />
          <Route path="/app/nutrition" element={<NutritionHome />} />
          <Route
            path="/app/nutrition/set-goal"
            element={<NutritionSetGoal />}
          />
          <Route
            path="/app/nutrition/diet-dashboard"
            element={<NutritionDietDash />}
          />
          <Route
            path="/app/nutrition/diet-search"
            element={<NutritionAddDiet />}
          />
          <Route path="/app/nutrition/scan" element={<NutritionScan />} />

          <Route path="/app/physical/intro" element={<PhysicalIntro />} />
          <Route path="/app/physical" element={<PhysicalHome />} />
          <Route path="/app/physical/set-goal" element={<PhysicalSetGoal />} />
          <Route
            path="/app/physical/add-activity"
            element={<PhysicalAddActivity />}
          />
          <Route
            path="/app/physical/activity-details"
            element={<PhysicalActivityDetail />}
          />

          <Route path="/app/wellness" element={<WellnessHome />} />
          
          <Route path="/app/health-record" element={<HealthRecordsHome />} />
          <Route path="/app/health-record/folder-list" element={<HealthRecordsDirectoryList />} />
          <Route path="/app/health-record/single-folder" element={<HealthRecordsSingleDirectory />} />

          <Route path="/app/testing" element={<Testing />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
