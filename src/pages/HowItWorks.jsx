import Header from "../components/Header";
import paw from "../assets/paw.png";
import heart from "../assets/heart.png";
import calendar from "../assets/calendar.png";
import "../styles/Home.css";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
const handleFind = () => {
  navigate("/allListings");
}
  return (
    <div className="home-page">
      <Header />

      {/* HOW IT WORKS */}
      <section className="how-section">
        <h2>How it works</h2>
        <div className="how-grid">
          <div className="how-item">
            <img src={paw} alt="Browse Pets" />
            <p>Browse Pets<br />Near You</p>
          </div>
          <div className="how-item">
            <img src={calendar} alt="Book Hangout" />
            <p>Book a<br />Hangout</p>
          </div>
          <div className="how-item">
            <img src={heart} alt="Enjoy" />
            <p>Enjoy!</p>
          </div>
        </div>
        <br></br>
        <button className="btn-primary" onClick={handleFind}>Find A Pet</button>
        <br></br>
        <br></br>
         <p>
          Our main service is to connect pets and their owners with seekers who, for reasons
          beyond their control, cannot own a pet but still want the joy of spending time
          with one.
        </p>

        <p>
          For safety reasons, we have a verification process before granting full access to
          the app. Within a couple of days after registering, your application may be approved
          or rejected by the admin.
        </p>

        <p>
          If you are a seeker and you request a pet, the owner must approve your request before
          any payment is required.
        </p>
          <p>More details on how the system works - Coming soon 🐾</p>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
