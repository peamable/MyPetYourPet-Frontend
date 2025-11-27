// src/pages/ProfileUpdatePage.jsx
import Header from "../components/Header";
import "../styles/Register.css";
import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";// adjust path if needed
// import EditUserForm from "../components/EditUserForm";   
import { useLocation } from "react-router-dom";
import axiosClient from "../axiosClient"
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function UpdateProfilePage() {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location_ = useLocation();
  const { userData } = location_.state || {};
  const accountId = localStorage.getItem("accountId");//-----------

  useEffect(() => {


    const user = {
    fullName: userData.fullName,
    role: userData.customerType === "PetOwner" ? "Owner":"Seeker", 
    email: userData.email,
    idNumber: userData.customerInfo.governmentID,
    phone: userData.customerInfo.phone,
    age: userData.customerInfo.age,
    gender: userData.customerInfo.gender,
    bio: userData.customerInfo.bio || "",
    address: userData.customerInfo.location,
    rating: userData.customerInfo.ratingAvg || 0,
    profilePicUrl: userData.profilePicture || "",
    status: userData.customerInfo.profileStatus,
    };
    setInitialValues(user);
    setLoading(false);
  }, []);

  const handleUpdate = async (formData) => {


    // console.log("Update profile submit data:", formData);

     const {
      fullName,
      // email,
      phone,
      age,
      gender,
      address,
      bio,
      image,
      password,
    } = formData;
    //  alert("Received formData: " + JSON.stringify(formData));
   // let usercredential = null;//-----------

    try{
      //PENDING TO UPDATE THE PASSWORD

      
      const payload = {
      id:accountId,//-----------
      fullName: fullName,
      customerInfo:{
        // email: email,        // could also use user.email
        phone: phone,
        age: parseInt(age),
        gender: gender,
        location: address,
        bio:bio,
        }
      };
      if (formData.password) {
          const email = localStorage.getItem("email");
          if (!email) throw new Error("No email in storage.");
      
          const user = auth.currentUser;
          const password = prompt("Please re-enter your current password to confirm password update:"); 
      
          if (!password) return; // user cancelled
          const credential = EmailAuthProvider.credential(email, password);
      
          await reauthenticateWithCredential(user, credential);
      
          await updatePassword(auth.currentUser, formData.password);
      }
      let apiURL = "";
      // alert(apiURL)
      // alert(formData.role)
      // alert("FormData role " + formData.role)
      // alert("role " + role);
      if (formData.role == "Owner")
      {
        apiURL = "/api/registration/updatePetOwner"; 
      }
      else if (formData.role == "Seeker")
      {
        apiURL = "/api/registration/updatePetSeeker"; 
      }
       else
       {
         throw new Error("Something went wrong, please try again")
       }
  
     
      const formDataToSend = new FormData();
      formDataToSend.append("ProfileUpdateRequest", new Blob([JSON.stringify(payload)], { type: "application/json" }));
      if(formData.image != null){
      formDataToSend.append("file", image);
      }

      await axiosClient.post(apiURL, formDataToSend);
      // toast.success("Account Updated successfully! 🎉");
         alert("Account Updated successfully! 🎉");//-----------------------
      if (formData.role=== "Owner") 
      { navigate("/owner/dashboard"); } 
      else { navigate("/seeker/dashboard"); }

      // setError("");
        // redirect if needed
        // window.location.href = "/login";
    } 
    catch (err) {
            alert("CATCH ERROR: ---> " + err.message);
     if (err.response && err.response.formData) {
       const backendError = err.response.formData.error || err.response.formData.message || "Unknown error";
          JSON.stringify(err.response.formData);
          throw new Error(backendError||"Something went Wrong");
        } else {
          setError(err.message || "Something went wrong");
        }
              alert("CATCH ERROR2: ---> " +backendError);
      }

    
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="page">
        <Header />
    <div className="register-card">
    
        
      <h2>Edit Profile</h2>

      <UserForm
        mode="edit"
        initialValues={initialValues}
        onSubmit={handleUpdate}
      />
    </div>
    </div>
  );
}