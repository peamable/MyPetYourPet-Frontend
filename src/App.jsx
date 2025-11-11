
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs"
import HowItWorks from "./pages/HowItWorks"
import Header from "./components/Header";
import OwnerDashboard from "./pages/OwnerDashboard";
import SeekerDashboard from "./pages/SeekerDashboard";
import CreateAPet from "./pages/CreateAPet";
import OwnerListings from "./pages/OwnerListings";
import PetProfileView from "./pages/PetProfileView";
import ReservationsView from "./pages/ReservationsView";

// const App = () => {
//   return <Home />;
// };

//use this navigate from Home to Login



export default function App() {
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
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
        <Route path="/owner/createapet" element={<CreateAPet />} />
        <Route path="/owner/ownerlistings" element={<OwnerListings />} />
        <Route path="/owner/petprofileview" element={<PetProfileView />} />

        <Route path="/viewListings" element={<OwnerListings />} /> 
         <Route path="/admin/reservation" element={<ReservationsView />} />
        {/*using the ContactUs button to test the pages*}

     {/*Here we add all the routes that we create for all the pages*/}
      </Routes>
     
      
  );
  

}



