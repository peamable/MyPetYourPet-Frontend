import React from "react";
import Header from "../components/Header";
import "../styles/ReservationsView.css";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function ReservationsView({embedded}) {

  const navigate = useNavigate();
  const handleFind = () => {
  navigate("/allListings");}

  const {pathname} = useLocation();

  const hideButton = pathname.startsWith("/owner/dashboard");

  return (
    <div className="reservations-page">
      {!embedded && <Header />}
      {/* <Header /> */} {/*this page is called in another view that already has a header*/}

      <div className="reservations-container">

        <h2 className="title">Reservations</h2>

        {/* Filters */}
        <div className="filters">
          {!embedded&& <select>
             <option>All roles</option>         
            <option>Owner</option>
            <option>Seeker</option>
          </select>}

          <select>
            <option>Any status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
          </select>

          <input type="text" placeholder="Search pets, people, IDs." />
  
         {!hideButton &&(
          <button className="new-booking-btn" onClick={handleFind}>New Booking</button>)}
        </div>

        {/* Upcoming Section */}
        <div className="section-card">
          <h3>Upcoming</h3>
          <p className="placeholder">No upcoming reservations yet.</p>
        </div>

        {/* Past Section */}
        <div className="section-card">
          <h3>Past</h3>
          <p className="placeholder">No past reservations found.</p>
        </div>

        {/* At a Glance Summary */}
        <div className="glance-card">
          <h3>At a glance</h3>
          <div className="glance-stats">
            <div className="stat-box">
              <div className="stat-value">0</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">0</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">0</div>
              <div className="stat-label">Confirmed</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">0</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>

      </div>
       {!embedded && <Footer /> }
    </div>
  );
}
