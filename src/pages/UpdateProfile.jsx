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

export default function UpdateProfilePage() {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location_ = useLocation();
  const { userData } = location_.state || {};
  const accountId = localStorage.getItem("accountId");//-----------
  // const user = {
  //   fullName: userData.fullName,
  //   role: userData.customerType, 
  //   email: userData.email,
  //   phone: userData.customerInfo.phone || "",
  //   bio: userData.customerInfo.bio || "",
  //   rating: userData.customerInfo.ratingAvg || 0,
  //   profilePicUrl: userData.profilePicture || "",
  //   status: userData.customerInfo.profileStatus || "",
  // };
                   
  // In a real app, you’d fetch this from your backend:
  useEffect(() => {
    // TODO: replace this with real API call
    // const fakeUserFromBackend = {
    //   fullName: "Phoebe Amable",
    //   role: "owner", // or "seeker"
    //   email: "phoebe@example.com",
    //   phone: "1234567890",
    //   age: 27,
    //   gender: "Female",
    //   idType: "Driver's License",
    //   idNumber: "AB1234567",
    //   address: "Vancouver, BC",
    //   profilePicUrl: "https://wallpapers.com/images/hd/tiktok-profile-pictures-phxg08ipdi0ka83z.jpg", // optional
    // };
    //setInitialValues(fakeUserFromBackend);

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
    // data includes:
    // fullName, role, email, phone, age, gender,
    // idType, idNumber, address, password (maybe), confirmPassword, image

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
    } = formData;
    //  alert("Received formData: " + JSON.stringify(formData));
   // let usercredential = null;//-----------

    try{
      //PENDING TO UPDATE THE PASSWORD
      // usercredential = await createUserWithEmailAndPassword(auth, email, password);
      // const user = usercredential.user
      // const firebaseUID = user.uid;
      //const firebaseToken = user
    
      // setFormData(prev => ({ ...prev, uid: firebaseUID }));
      //we are setting the form data in userform

     
      //payload will hold the data we want to send
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

     // this should be sent to a specific function "createAccount"
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
      // alert(formDataToSend);

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
      // alert(apiURL);
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
     //delete the firebase record if there was an error saving into the database
      // if (usercredential) {
      // try {
      //   await usercredential.user.delete();
      //   // optionally: await auth.signOut();
      // } catch (delErr) {
      //   console.log("Failed to rollback Firebase user:", delErr);
      // }
      //  }
     if (err.response && err.response.formData) {
       const backendError = err.response.formData.error || err.response.formData.message || "Unknown error";
          JSON.stringify(err.response.formData);
          throw new Error(backendError||"Something went Wrong");
        } else {
          setError(err.message || "Something went wrong");
        }
              alert("CATCH ERROR2: ---> " +backendError);
      }

    // 🔴 TODO:
    // - Call your backend: PUT /api/profile or similar
    // - Optionally, if data.password is non-empty:
    //     update password in Firebase / your auth system

    // Example structure (you will fill this in later):
    //
    // try {
    //   await axiosClient.put("/api/profile", payload);
    //   if (data.password) {
    //     await updatePassword(auth.currentUser, data.password);
    //   }
    // } catch (err) {
    //   throw new Error("Something went wrong updating your profile");
    // }

    // IMPORTANT:
    // If you throw an Error here, UserForm will catch it
    // and show err.message in setError().
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