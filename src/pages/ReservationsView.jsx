import React from "react";
import Header from "../components/Header";
import "../styles/ReservationsView.css";

export default function ReservationsView() {
  return (
    <div className="reservations-page">
      <Header />

      <div className="reservations-container">

        <h2 className="title">Reservations</h2>

        {/* Filters */}
        <div className="filters">
          <select>
            <option>All roles</option>
            <option>Owner</option>
            <option>Seeker</option>
          </select>

          <select>
            <option>Any status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
          </select>

          <input type="text" placeholder="Search pets, people, IDs." />

          <button className="new-booking-btn">New Booking</button>
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
    </div>
  );
}
