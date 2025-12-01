import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import toast from "react-hot-toast";

export default function PaymentSuccess() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Confirming your payment...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    if (!sessionId) {
      setMessage("Payment session missing.");
      setLoading(false);
      toast.error("Payment session not found.");
      return;
    }

    const confirmPayment = async () => {
      try {
        const res = await axiosClient.post(
          `/api/payments/confirm-payment?session_id=${sessionId}`
        );

        setMessage("Payment confirmed! Thank you 🐾");
        toast.success("Payment successful!");

        // Optional: small delay before redirect
        setTimeout(() => {
          navigate("/seeker/dashboard"); // or /reservations
        }, 5000);

      } catch (err) {
        console.error(err);
        setMessage("Unable to confirm payment.");
        toast.error("Payment confirmation failed.");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {loading ? (
          <>
            <div style={styles.spinner}></div>
            <h2>Processing Payment…</h2>
            <p>Please wait a moment.</p>
          </>
        ) : (
          <>
            <h2>🎉 Payment Successful!</h2>
            <p>{message}</p>
            <button
              style={styles.button}
              onClick={() => navigate("/seeker/dashboard")}
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------
// Minimal inline styles
// -----------------------------------------
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    background: "#f7f7f7",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    padding: "30px",
    borderRadius: "12px",
    background: "#fff",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #ccc",
    borderTop: "4px solid #6b4eff",
    borderRadius: "50%",
    margin: "20px auto",
    animation: "spin 1s linear infinite",
  },
  button: {
    marginTop: "15px",
    padding: "10px 18px",
    borderRadius: "8px",
    background: "#6b4eff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};
