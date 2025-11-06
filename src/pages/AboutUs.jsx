import { useState } from "react";
import '../styles/Header.css';
import Header from "../components/Header";
import axiosClient from "../axiosClient"

export default function AboutUs() {
  const [error, setError] = useState("");

  const test = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosClient.get("/api/v1/testing");
      //for now we need to update the password in axiosClient.js

      console.log(response.data); // should be { status: "OK", version: "v1" }
      alert("Test created successfully! 🎉");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="page">
      <Header />
      <h1>About Us</h1>
      <p>Coming soon 🐾</p>
      <p>A short paragraph about who we are and the team</p>

      <button onClick={test}>Test API</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}