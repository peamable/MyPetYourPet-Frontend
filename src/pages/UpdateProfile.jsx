// src/pages/ProfileUpdatePage.jsx
import Header from "../components/Header";
import "../styles/Register.css";
import { useEffect, useState } from "react";
import UserForm from "../components/UserForm"; // adjust path if needed

export default function UpdateProfilePage() {

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // In a real app, you’d fetch this from your backend:
  useEffect(() => {
    // TODO: replace this with real API call
    const fakeUserFromBackend = {
      fullName: "Phoebe Amable",
      role: "owner", // or "seeker"
      email: "phoebe@example.com",
      phone: "1234567890",
      age: 27,
      gender: "Female",
      idType: "Driver's License",
      idNumber: "AB1234567",
      address: "Vancouver, BC",
      profilePicUrl: "https://wallpapers.com/images/hd/tiktok-profile-pictures-phxg08ipdi0ka83z.jpg", // optional
    };

    setInitialValues(fakeUserFromBackend);
    setLoading(false);
  }, []);

  const handleUpdate = async (data) => {
    // data includes:
    // fullName, role, email, phone, age, gender,
    // idType, idNumber, address, password (maybe), confirmPassword, image

    console.log("Update profile submit data:", data);

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