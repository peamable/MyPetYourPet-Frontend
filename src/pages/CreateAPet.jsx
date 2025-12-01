import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../styles/CreateAPet.css";
import axiosClient from "../axiosClient";


export default function CreateAPet({ embedded, accountId, onClose }) {
  const [formData, setFormData] = useState({
    petName: "",
    petAge: "",
    petGender: "",
    petBreed: "",
    petBehavior: "",
    dewormingUpToDate: "", 
    vaccinationUpToDate:"",
    petFee: "",
    petProfileStatus: "",
  });

  const [dewormed, setDeworm] = useState(false);
  const [vaccinated, setVaccinated] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleSave = async (e) => {  // what to do when the user clicks submit
    e.preventDefault();
    if (
      !formData.petName ||
      !formData.age ||
      !formData.gender ||
      !formData.breed ||
      !formData.behavior ||
      !formData.fee ||
      !formData.status ||
      !image

    ) {
      setError("Please fill out all required fields and select an image.");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(image.type)) {
      setError("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (image.size > maxSize) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    try{
      // const token = await user.getIdToken(); //user is undefined-------------------------
      const payload = {
          petName: formData.petName,
          petAge: parseInt(formData.age),
          petGender: formData.gender === "Female", // true for Female
          petBreed: formData.breed,
          petBehavior: formData.behavior,
          dewormingUpToDate: dewormed,
          vaccinationUpToDate: vaccinated,
          petFee: parseFloat(formData.fee),
          customerId: accountId,
          petProfileStatus: formData.status === "Active", // true for active

      };
      let apiURL = "/api/v1/pets/createPet" 
      const formDataToSend = new FormData();
      formDataToSend.append("Pet", new Blob([JSON.stringify(payload)], { type: "application/json" }));
      formDataToSend.append("file", image);



      // await axiosClient.post(apiURL, formDataToSend, { headers: { Authorization: `Bearer ${token}`} });
      await axiosClient.post(apiURL, formDataToSend);
      alert("Pet created successfully! 🎉");
      setError("");
      onClose();
    } 
    catch (err) {
        if (err.response && err.response.data) {
          const backendError = err.response.data.error || err.response.data.message || "Unknown error";
          setError(backendError);
        } else {
          setError(err.message || "Something went wrong");
        }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setFormData({
      petName: "",
      age: "",
      gender: "",
      breed: "",
      behavior: "",
      fee: "",
      status: "",
    });
    setDeworm(false);
    setVaccinated(false);
    setPreview(null);
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="page create-pet-page">
      <div className="create-pet-container">
        {/* LEFT FORM */}
        <div className="create-pet-form">
          <h1>Create Pet Listing</h1>
          {error && <p className="error-message">{error}</p>}

          <div className="grid-2">
            <label>
              Pet Name
              <input name="petName" value={formData.petName} onChange={handleChange} />
            </label>

            {/* <label>
              Pet ID (auto)
              <input disabled value="Auto-Generated" />
            </label> */}
          </div>

          <div className="grid-3">
            <label>
              Age (years)
              <input name="age" value={formData.age} onChange={handleChange} />
            </label>

            <label>
              Gender
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>

            <label>
              Breed
              <input name="breed" value={formData.breed} onChange={handleChange} />
            </label>
          </div>

          <label>
            Behavior / Temperament
            <textarea name="behavior" value={formData.behavior} onChange={handleChange} />
          </label>

          <div className="grid-2 checkbox-row">
            <label>
              <input type="checkbox" checked={dewormed} onChange={() => setDeworm(!dewormed)} />
              Deworming up to date
            </label>

            <label>
              <input type="checkbox" checked={vaccinated} onChange={() => setVaccinated(!vaccinated)} />
              Vaccination up to date
            </label>
          </div>

          <div className="grid-2">
            <label>
              Listing Fee (CAD)
              <input name="fee" value={formData.fee} onChange={handleChange} />
            </label>

            <label>
              Profile Picture
              <input type="file" accept="image/*" onChange={handleImage} />
            </label>
          </div>

          <label>
            Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
            </select>
          </label>

          <div className="button-row">
             <button className="btn-save" onClick={handleSave}>Save Listing</button>  {/*Add data to db and go back to listings */ }
            <button className="btn-reset" onClick={handleReset}>Reset</button>
            {/* <Link className="btn-back" to= "/owner/dashboard">Back to My Listings</Link> {/*Need to work on the navigation*/ }
            <button className="btn-back" onClick={onClose}>
                Back to My Listings
            </button>
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="pet-preview">
          <div className="preview-card">
            {preview ? <img src={preview} alt="pet preview" /> : <div className="img-placeholder">Pet Image Preview</div>}
            <h2>{formData.petName || "Pet Name"}</h2>
            <p className="tag">{formData.status}</p>

            <p>
              {formData.breed || "Breed"} • {formData.age || "--"} years • {formData.gender || "--"}
            </p>

            <p className="behavior-text">
              {formData.behavior || "Behavior will appear here."}
            </p>

            <h3>${formData.fee || "0.00"}</h3>
          </div>
        </div>
      </div>

    </div>
  );
}
