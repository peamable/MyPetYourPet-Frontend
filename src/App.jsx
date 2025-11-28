
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs"
import HowItWorks from "./pages/HowItWorks"
import OwnerDashboard from "./pages/OwnerDashboard";
import SeekerDashboard from "./pages/SeekerDashboard";
import CreateAPet from "./pages/CreateAPet";
import OwnerListings from "./pages/OwnerListings";
import PetProfileView from "./pages/PetProfileView";
import ReservationsView from "./pages/ReservationsView";
import ProfileView from "./pages/ProfileView"
import PetListings from "./pages/PetList"
import UpdateProfilePage from "./pages/UpdateProfile";
import PetUpdate from "./components/UpdatePet"
import AdminDashboard from "./pages/AdminSupportView";
import UpdatePet from "./components/UpdatePet"
import Admin from "./pages/AdminSupportView"
import PaymentSuccess from "./pages/PaymentSuccess"
import React, { useEffect } from "react";
import { attachAuthListener } from "./AuthListener.js";
import toast from "react-hot-toast";


export default function App() {

useEffect(() => {
    // Prevent infinite loop:
    // Only attach listener if user actually logged in through your backend
    const email = localStorage.getItem("email");  
    if (!email) return;   // <-- Stop here if no local session

    attachAuthListener(() => {
      toast.error("Session expired. Please log in again.");
      localStorage.clear();
      window.location.href = "/login"; 
    });
  }, []);
  return(
  
      <Routes>
        {/* Default route (Home page) */}
        <Route path="/" element={<Home />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Register route */}
        <Route path="/register" element={<Register />} />

        {/* AboutUs route */}
        <Route path="/about" element={<AboutUs />} />

        {/* How it works route */}
        <Route path="/howItWorks" element={<HowItWorks />} />

     
        {/*Role specific routes*/}
        <Route path="/owner/dashboard" element={<OwnerDashboard />}>
          {/* <Route index element={<OwnerDashboardHome />} />
          <Route path="listings" element={<OwnerListings />} /> */}
        </Route>
      

        <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
        <Route path="/owner/createapet" element={<CreateAPet />} />
        <Route path="/owner/ownerlistings" element={<OwnerListings />} />
        <Route path="/owner/petprofileview" element={<PetProfileView />} />

        <Route path="/viewListings" element={<OwnerListings />} /> 
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/allListings" element={<PetListings />} />
        <Route path="/seeker/viewProfile" element={< ProfileView/>} />
        <Route path="/customer/editProfile" element={< UpdateProfilePage/>} />

        <Route path="/updatePet" element={< UpdatePet/>} />
        {/* <Route path="/owner/editProfile" element={< UpdateProfilePage/>} /> */}

         <Route path="/admin/dashboard" element={<AdminDashboard />} />  

         <Route path="/payment-success" element={<PaymentSuccess />} /> 
     {/*Here we add all the routes that we create for all the pages*/}
      </Routes>
     
      
  );
  

}



