import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient"; // Make sure this is already configured
import Header from "../components/Header";
import "../styles/ReservationsView.css";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ReservationsView({ embedded }) {
  const navigate = useNavigate();
  const accountId = localStorage.getItem("accountId"); // customerId (Seeker ID)
  const userRole = localStorage.getItem("role");
  const { pathname } = useLocation();
  const hideButton = pathname.startsWith("/owner/dashboard");

  // State to store reservation data
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reservation data on component load
  useEffect(() => {
  const fetchReservations = async () => {
    try {
      const endpoint =
        userRole === "owner"
          ? `/api/reservations/owner/view/${accountId}`
          : `/api/reservations/seeker/view/${accountId}`;

      const res = await axiosClient.get(endpoint);
      setReservations(res.data || []);
    } catch (err) {
      console.error("Failed to load reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  if (accountId) fetchReservations();
}, [accountId, userRole]);

  const handleFind = () => navigate("/allListings");

  const handleStatusChange = async (reservationId, newStatus) => {
  try {
    await axiosClient.patch(`/api/reservations/updateStatus/${reservationId}`, {
      status: newStatus,
    });
    alert("Status updated!");
    // Refresh the list
    const res = await axiosClient.get(`/api/reservations/${userRole === "owner" ? "owner/view" : "seeker/view"}/${accountId}`);
    setReservations(res.data);
  } catch (err) {
    console.error("Failed to update status:", err);
    toast.error("Error updating status");
  }
};

  // Categorization logic
  const upcomingReservations = reservations.filter((res) =>
    ["Pending", "Confirmed"].includes(res.petResStatus)
  );
  const pastReservations = reservations.filter((res) =>
    ["Completed"].includes(res.petResStatus)
  );

  // Stats
  const total = reservations.length;
  const pending = reservations.filter((res) => res.petResStatus === "Pending").length;
  const confirmed = reservations.filter((res) => res.petResStatus === "Confirmed").length;
  const completed = reservations.filter((res) => res.petResStatus === "Completed").length;

  return (
    <div className="reservations-page">
      {!embedded && <Header />}

      <div className="reservations-container">
        <h2 className="title">Reservations</h2>

        {/* Filters */}
        <div className="filters">
          {!embedded && (
            <select>
              <option>All roles</option>
              <option>Owner</option>
              <option>Seeker</option>
            </select>
          )}

          <select>
            <option>Any status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
          </select>

          <input type="text" placeholder="Search pets, people, IDs." />

          {!hideButton && (
            <button className="new-booking-btn" onClick={handleFind}>
              New Booking
            </button>
          )}
        </div>

        {/* Loading indicator */}
        {loading && <p className="placeholder">Loading reservations...</p>}

        {/* Upcoming Section */}
        <div className="section-card">
          <h3>Upcoming</h3>
          {upcomingReservations.length === 0 ? (
            <p className="placeholder">No upcoming reservations yet.</p>
          ) : (
            upcomingReservations.map((res) => (
            <div key={res.petResId} className="reservation-row">
              
              <div className="reservation-pet">
                <img
                  src={res.petImageUrl || "/default_pro_pic.jpg"}
                  alt={res.petName}
                  className="reservation-pet-img"
                />
                <span className="reservation-pet-name">{res.petName}</span>
              </div>
             
              <span>
                {new Date(res.startDate).toLocaleDateString()} →{" "}
                {new Date(res.endDate).toLocaleDateString()}
              </span>
              
              {userRole === "owner" ? (
              <select
                value={res.petResStatus}
                onChange={(e) => handleStatusChange(res.petResId, e.target.value)}
                className={`status-dropdown enhanced-dropdown status-${res.petResStatus.toLowerCase()}`}
              >
                <option value="Pending">Pending</option>
                {/*<option value="Confirmed" disabled={new Date(res.endDate) < new Date()}>Confirmed</option>*/}
                <option value="Confirmed">Confirmed</option>
                <option value="Rejected">Rejected</option>
              </select>
            ) : (
              <button className={`status-badge ${res.petResStatus.toLowerCase()}`} disabled>
                {res.petResStatus}
              </button>
            )}
            </div>
          ))
          )}
        </div>

        {/* Past Section */}
        <div className="section-card">
          <h3>Past</h3>
          {pastReservations.length === 0 ? (
            <p className="placeholder">No past reservations found.</p>
          ) : (
            pastReservations.map((res) => (
              <p key={res.petResId}>
                Pet ID: {res.petId} | From:{" "}
                {new Date(res.startDate).toLocaleDateString()} | Status:{" "}
                {res.petResStatus}
              </p>
            ))
          )}
        </div>

        {/* Stats Summary */}
        <div className="glance-card">
          <h3>At a glance</h3>
          <div className="glance-stats">
            <div className="stat-box">
              <div className="stat-value">{total}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{pending}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{confirmed}</div>
              <div className="stat-label">Confirmed</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{completed}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {!embedded && <Footer />}
    </div>
  );
}
