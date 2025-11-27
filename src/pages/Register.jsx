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
            // const { email, password } = formData;
      //-------------------------------------------------------------------------------
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
            firebaseUID: firebaseUID,             // from Firebase
            fullName: fullName,
            email: email,        // could also use user.email
            phone: phone,
            age: parseInt(age),
            gender: gender,
            location: address,
            bio:bio,
            };
    } 
      payload = {
        firebaseUID,
        fullName,
        email,
        phone,
        age: parseInt(age),
        gender,
        governmentId: idNumber,
        location: address,
        bio,
      };
    

     // this should be sent to a specific function "createAccount"
      let apiURL = "";
      // alert(apiURL)
      // alert(formData.role)
      // alert(role);
      if (role == "Owner")
      {
        //apiURL = "/api/PetOwnerUser/createAccount"
         apiURL = "/api/registration/petOwner";
      }
      else if (role == "Seeker")
      {
        apiURL = "/api/registration/petSeeker";
      }
      else if (role === "admin") 
      {
        apiURL = "/api/registration/admin";
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

    
      //for debugging............................................................
      // for (let [key, value] of formDataToSend.entries()) {
      //   if (value instanceof Blob) {
      //     value.text().then((text) => {
      //       alert(`${key}:\n${text}`);
      //     });
      //   } else if (value instanceof File) {
      //     alert(`${key}: ${value.name} (${value.type})`);
      //   } else {
      //     alert(`${key}: ${value}`);
      //   }
      // }
      //...............................................................................
    //Send to backend
      await axiosClient.post(apiURL, formDataToSend);
      alert("Account created successfully!");
      navigate("/login")

      // setError("");
        // redirect if needed
        // window.location.href = "/login";
    } 
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


/* I made one common component and used them in register and update profile*/
//It should work but the file selection keeps freezing on me. Ill try again during the day
//.......................................................................       
     )

  // return (
    
  //   <div className="register-page">
  //     <Header />

  //     {/* Hero Section */}
  //     <section className="register-hero">
  //       <h1>Start your pet journey</h1>
  //       <ul>
  //         <li>Owners: share your pet safely</li>
  //         <li>Seekers: book short pet hangouts</li>
  //         <li>Build trust with reviews</li>
  //       </ul>
  //     </section>

  //     {/* Register Form Card */}
  //     <div className="register-card">
  //       <div className="register-brand">
  //         <img src={pawIcon} alt="paw" className="paw-icon" />
  //         <span>My pet, Your pet</span>
  //       </div>
  //       <p className="subtitle">Create Your Account</p>

  //       <form onSubmit={handleSubmit} className="register-form">
  //         <label>Full Name</label>
  //         <input name="fullName" onChange={handleChange} required />

  //         <label>Role</label>
  //         <select name="role" onChange={handleChange} required>
  //           <option value="">Select</option>
  //           <option value="owner">Owner</option>
  //           <option value="seeker">Seeker</option>
  //         </select>

  //         <label>Email</label>
  //         <input type="email" name="email" onChange={handleChange} required />

  //         <label>Phone</label>
  //         <input type="tel" name="phone" onChange={handleChange} />

  //         {/* Government ID Section */}
  //         <div className="gov-section">
  //           <p className="gov-label">Government ID</p>
  //           <label>ID Type</label>
  //           <input name="idType" onChange={handleChange} />
  //           <label>ID Number</label>
  //           <input name="idNumber" onChange={handleChange}/>
  //           <p className="gov-note">
  //             We only use this for verification. It will be encrypted and never shared publicly.
  //           </p>
  //         </div>

  //         <label>location</label>
  //         <input name="address" onChange={handleChange} />

  //         <label>age</label>
  //         <input type="number" name="age" onChange={handleChange}/>

  //         {/* <label>Gender</label>
  //         <select name="gender" onChange={handleChange}>
  //           <option value="">Select</option>
  //           <option value="male">Male</option>
  //           <option value="female">Female</option>
  //         </select> */}
  //         <label>Gender</label>
  //         <input name="gender" onChange={handleChange} />

  //         <label>
  //         Profile Picture
  //         <input type="file" accept="image/*" onChange={handleImage} />
  //         </label>

  //         <label>Password</label> 
  //         <input type="password" name="password" onChange={handleChange} required />

  //         <label>Confirm Password</label>
  //         <input type="password" name="confirmPassword" onChange={handleChange} required />

  //         <div className="terms">
  //           <input type="checkbox" required />
  //           <label>
  //             I agree to the <a href="#">Terms & Conditions</a> and{" "}
  //             <a href="#">Privacy Policy</a>
  //           </label>
  //         </div>

  //         <button type="submit" className="btn-primary">Create Account</button>
  //         {error && <p className="error-text">{error}</p>}
  //       </form>

  //       <p className="login-link">
  //         Already have an account? <Link to="/login">Back to Login</Link>
  //       </p>
  //     </div>
  //   </div>
    
  // );
}