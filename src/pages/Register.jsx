import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Header from "../components/Header";
import "../styles/Register.css";
import pawIcon from "../assets/paw.png";
import axiosClient from "../axiosClient"

export default function Register() {
  const [formData, setFormData] = useState({
    uid: "",
    fullName: "",
    role: "",
    email: "",
    phone: "",
    idType: "",
    governmentId: "",
    location: "",
    gender:"female", //hardcoded
    password: "",
    confirmPassword: "",
    profilePic:"",
    age:24, //hardcoded
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {  // what to do the form fields change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {  // what to do when the user clicks submit
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try{
      const usercredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = usercredential.user

      const firebaseUID = user.uid;
      setFormData(prev => ({ ...prev, uid: firebaseUID }));

     
       //payload will hold the data we want to send
      const payload = {
      //uid: firebaseUID,             // from Firebase
      fullName: formData.fullName,
      role: formData.role,
      email: formData.email,        // could also use user.email
      //governmentId:formData.governmentId,
      profilePic: formData.profilePic,
      governmentId: formData.governmentId,
      location: formData.location,
      gender: formData.gender,
      age:Number(formData.age),
 
      };

     // this should be sent to a specific function "createAccount"
      let apiURL = ""
      // alert(apiURL)
      // alert(formData.role)

      if (formData.role == "owner")
      {
        //apiURL = "/api/PetOwnerUser/createAccount"
         apiURL = "/api/registration/petOwner"
      }
      else if (formData.role == "seeker")
      {
        apiURL = "/api/registration/petSeeker"
      }
      else
      {
        alert(formData.role)
      }
      alert(apiURL)
    
      await axiosClient.post(apiURL, payload);

        alert("Account created successfully! 🎉");

        // redirect if needed
        // window.location.href = "/login";

    } 
    catch (err) {
        setError(err.message || "Something went wrong");
      }
};

  return (
    <div className="register-page">
      <Header />

      {/* Hero Section */}
      <section className="register-hero">
        <h1>Start your pet journey</h1>
        <ul>
          <li>Owners: share your pet safely</li>
          <li>Seekers: book short pet hangouts</li>
          <li>Build trust with reviews</li>
        </ul>
      </section>

      {/* Register Form Card */}
      <div className="register-card">
        <div className="register-brand">
          <img src={pawIcon} alt="paw" className="paw-icon" />
          <span>My pet, Your pet</span>
        </div>
        <p className="subtitle">Create Your Account</p>

        <form onSubmit={handleSubmit} className="register-form">
          <label>Full Name</label>
          <input name="fullName" onChange={handleChange} required />

          <label>Role</label>
          <select name="role" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="owner">Owner</option>
            <option value="seeker">Seeker</option>
          </select>

          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />

          <label>Phone</label>
          <input type="tel" name="phone" onChange={handleChange} />

          {/* Government ID Section */}
          <div className="gov-section">
            <p className="gov-label">Government ID</p>
            <label>ID Type</label>
            <input name="idType" onChange={handleChange} />
            <label>ID Number</label>
            <input name="idNumber" onChange={handleChange}/>
            <p className="gov-note">
              We only use this for verification. It will be encrypted and never shared publicly.
            </p>
          </div>

          <label>location</label>
          <input name="address" onChange={handleChange} />

          <label>age</label>
          <input type="number" name="age" onChange={handleChange}/>

          <label>Gender</label>
          <select name="gender" onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>Password</label> 
          <input type="password" name="password" onChange={handleChange} required />

          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" onChange={handleChange} required />

          <div className="terms">
            <input type="checkbox" required />
            <label>
              I agree to the <a href="#">Terms & Conditions</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="btn-primary">Create Account</button>
          {error && <p className="error-text">{error}</p>}
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
