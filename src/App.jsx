
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs"
import HowItWorks from "./pages/HowItWorks"
import Header from "./components/Header";



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

      {/*Here we add all the routes that we create for all the pages*/}
  



      </Routes>
      
  );
  //  (

    // <div>
    //   {/* Navigation bar or menu */}
    //   <nav style={{ padding: "1rem", background: "#eee" }}>
    //     <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
    //     <Link to="/login">Login</Link>
    //   </nav>

    //   {/* Define the routes */}
    //   <Routes>
    //     <Route path="/" element={<h1>Welcome to My Pet, Your Pet 🐾</h1>} />
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
   // </div>
  // );


}



