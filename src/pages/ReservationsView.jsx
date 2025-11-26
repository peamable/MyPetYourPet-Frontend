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
  const [statusFilter, setStatusFilter] = useState("Any");
  const [searchTerm, setSearchTerm] = useState("");

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

  const handlePay = async (reservationId, petFee) => {
    try {
    //const petFee = localStorage.getItem("petFeeForReservation")
    //reservationId = reservationId; // or however you store it
    const amountCents = Math.round(petFee * 100); // e.g. 20.00 CAD → 2000
    

    const res = await axiosClient.post(
      "/api/payments/create-checkout-session",
      {
        reservationId,
        amountCents,
      }
    );

    // Redirect to Stripe
    window.location.href = res.data.url;

  } catch (err) {
    console.error(err);
    toast.error("Payment failed to start");
  }
  };

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

const filteredReservations = reservations.filter((res) => {
  // STATUS FILTER
  if (statusFilter !== "Any" && res.petResStatus !== statusFilter) {
    return false;
  }

  // SEARCH FILTER — checks pet name, status, ID, dates
  const term = searchTerm.toLowerCase();
  if (
    !res.petName.toLowerCase().includes(term) &&
    !res.petResStatus.toLowerCase().includes(term) &&
    !String(res.petResId).includes(term) &&
    !String(res.petId).includes(term)
  ) {
    return false;
  }

  return true;
});

  // Categorization logic
  // const upcomingReservations = reservations.filter((res) =>
  //   ["Pending", "Confirmed"].includes(res.petResStatus)
  // );
  // const pastReservations = reservations.filter((res) =>
  //   ["Completed"].includes(res.petResStatus)
  // );

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

            {/* STATUS FILTER */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Any">All</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
              <option value="Confirmed - Pending Payment">Confirmed - Pending Payment</option>
              <option value="Confirmed - Paid">Confirmed - Paid</option>
            </select>

            {/* SEARCH FILTER */}
            <input
              type="text"
              placeholder="Search pets, people, IDs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {!hideButton && (
              <button className="new-booking-btn" onClick={handleFind}>
                New Booking
              </button>
            )}
          </div>

        {/* Loading indicator */}
        {loading && <p className="placeholder">Loading reservations...</p>}

<div className="section-card">
  <h3>All Reservations</h3>

  {filteredReservations.length === 0 ? (
    <p className="placeholder">No matching reservations.</p>
  ) : (
    filteredReservations.map((res) => (
      <div key={res.petResId} className="reservation-row">

        {/* Pet image + name */}
        <div className="reservation-pet">
          <img
            src={res.petImageUrl || "/default_pro_pic.jpg"}
            alt={res.petName}
            className="reservation-pet-img"
          />
          <span className="reservation-pet-name">{res.petName}</span>
        </div>

        {/* Dates */}
        <span>
          {new Date(res.startDate).toLocaleDateString()} →{" "}
          {new Date(res.endDate).toLocaleDateString()}
        </span>

        {/* OWNER VIEW */}
        {userRole === "owner" ? (
          <div className="owner-controls">
            <span className={`status-badge ${res.petResStatus.toLowerCase()}`}>
              {res.petResStatus}
            </span>
            {res.petResStatus === "Pending" &&(
            <select
              defaultValue=""
              onChange={(e) => handleStatusChange(res.petResId, e.target.value)}
              className="status-action-dropdown"
            >
              <option value="" disabled>Choose Action</option>
              <option value="Confirmed - Pending Payment">Accept</option>
              <option value="Rejected">Decline</option>
            </select>
            )}
          </div>
        ) : (
          <button className={`status-badge ${res.petResStatus.toLowerCase()}`} disabled>
            {res.petResStatus}
          </button>
        )}

        {/* SEEKER PAY BUTTON */}
        {userRole === "seeker" && res.petResStatus === "Confirmed - Pending Payment" && (
          <button
            className="pay-btn"
            onClick={() => handlePay(res.petResId, res.serviceAmount)}
          >
            Pay Now
          </button>
        )}

      </div>
    ))
  )}
</div>

        {/* Upcoming Section */}
        
 {/*.............................................................................*/}       
        {/* <div className="section-card">
  <h3>Upcoming</h3>

  {upcomingReservations.length === 0 ? (
    <p className="placeholder">No upcoming reservations yet.</p>
  ) : (
    upcomingReservations.map((res) => (
      <div key={res.petResId} className="reservation-row"> */}

        {/* Pet image + name */}
        {/* <div className="reservation-pet">
          <img
            src={res.petImageUrl || "/default_pro_pic.jpg"}
            alt={res.petName}
            className="reservation-pet-img"
          />
          <span className="reservation-pet-name">{res.petName}</span>
        </div> */}

        {/* Dates */}
        {/* <span>
          {new Date(res.startDate).toLocaleDateString()} →{" "}
          {new Date(res.endDate).toLocaleDateString()}
        </span> */}

        {/* OWNER DROPDOWN OR SEEKER STATUS BADGE */}
        {/* {userRole === "owner" ? (
          <select
            value={res.petResStatus}
            onChange={(e) => handleStatusChange(res.petResId, e.target.value)}
            className={`status-dropdown enhanced-dropdown status-${res.petResStatus.toLowerCase()}`}
          >
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Confirmed - Pending Payment">Confirmed - Pending Payment</option>
            <option value="Confirmed - Paid">Confirmed - Paid</option>
          </select>
        ) : (
          <button className={`status-badge ${res.petResStatus.toLowerCase()}`} disabled>
            {res.petResStatus}
          </button>
        )} */}

        {/* OWNER VIEW: STATUS + ACTION DROPDOWN */}
          {/* {userRole === "owner" ? (
            <div className="owner-controls"> */}

              {/* Show CURRENT STATUS */}
              {/* <span className={`status-badge ${res.petResStatus.toLowerCase()}`}>
                {res.petResStatus}
              </span> */}

              {/* Action dropdown */}
              {/* <select
                defaultValue=""
                onChange={(e) => handleStatusChange(res.petResId, e.target.value)}
                className="status-action-dropdown"
              >
                <option value="" disabled>Choose Action</option>
                <option value="Confirmed - Pending Payment">Accept</option>
                <option value="Rejected">Decline</option>
              </select>

            </div> */}
          {/* ) : (
            <button className={`status-badge ${res.petResStatus.toLowerCase()}`} disabled>
              {res.petResStatus}
            </button>
          )} */}

        {/* SEEKER ONLY: PAY BUTTON  && res.petResStatus === "Confirmed - Pending Payment"*/}
        {/* {userRole === "seeker"  && (
          <button
            className="pay-btn"
            onClick={() => handlePay(res.petResId, res.serviceAmount)}
          >
            Pay Now
          </button>
        )}

      </div>
    ))
  )}
</div> */}
{/*.............................................................................*/}
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
