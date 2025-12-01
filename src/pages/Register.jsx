import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Register.css";
import pawIcon from "../assets/paw.png";
import axiosClient from "../axiosClient"
import UserForm from "../components/UserForm";


export default function Register() {
  
  const navigate = useNavigate();
  // let usercredential;

  const handleRegister = async (formData) => {
        const {
      fullName,
      email,
      phone,
      age,
      gender,
      address,
      role,
      password,
      bio,
      image,
      govIdFile,
      backCheckFile,
    } = formData;
    // alert("Received formData: " + JSON.stringify(formData));
    let usercredential = null;
    try{
       if(age<18){
         alert("Sorry, only users over 18 years old can use My Pet, Your Pet services");
       }
       else{

      // alert("Register Step 0 good");
      usercredential = await createUserWithEmailAndPassword(auth, email, password);
      // alert("Register Step 1 good");
      const user = usercredential.user
      const firebaseUID = user.uid;
      //const firebaseToken = user
    
      const payload = {
      firebaseUID: firebaseUID,             
      fullName: fullName,
      email: email,        
      phone: phone,
      age: parseInt(age),
      gender: gender,
      location: address,
      bio:bio,
      };

     
      let apiURL = "";
 
      // alert(formData.role)

      if (role == "Owner")
      {
        
         apiURL = "/api/registration/petOwner";
      }
      else if (role == "Seeker")
      {
        apiURL = "/api/registration/petSeeker";
      }
       else
       {
         throw new Error("Please select a role")
       }
      // alert(apiURL) //this was for debugging

 
      const formDataToSend = new FormData();
      formDataToSend.append("RegistrationRequest", new Blob([JSON.stringify(payload)], { type: "application/json" }));
      // formDataToSend.append("file", image);
      if (image) {
        formDataToSend.append("Picture", image);
      }
      if (govIdFile) {
        formDataToSend.append("GovId", govIdFile);
      }
      if (backCheckFile) {
        formDataToSend.append("BackCheck", backCheckFile);
      }

      await axiosClient.post(apiURL, formDataToSend);
      
      localStorage.clear();
      auth.currentUser = null;
      alert("Account created successfully! 🎉");
      navigate("/login")

    } }
    catch (err) {
     //delete the firebase record if there was an error saving into the database
      // alert("CATCH ERROR: ---> " + err.message);
      
      if (usercredential) {
        try {
          await usercredential.user.delete();
          // optionally: await auth.signOut();
        } catch (delErr) {
          console.log("Failed to rollback Firebase user:", delErr);
        }
      }

      if (err.response && err.response.data) {
       const backendError = err.response.data.error || err.response.data.message || "Unknown error";
          JSON.stringify(err.response.data);
          throw new Error(backendError||"Something went Wrong");
      } else {
        setError(err.message || "Something went wrong");
      }
      
      // alert("CATCH ERROR2: ---> " +err.message);
    }
};


     return(
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

       <div className="register-card">
         <div className="register-brand">
           <img src={pawIcon} alt="paw" className="paw-icon" />
           <span>My pet, Your pet</span>
         </div>
         <p className="subtitle">Create Your Account</p>
         <UserForm mode="create" onSubmit={handleRegister} />
         </div>
          <Footer />
       </div>     
     )
}
