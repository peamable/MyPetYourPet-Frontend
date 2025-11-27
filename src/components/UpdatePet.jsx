import React, { useRef, useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "../styles/CreateAPet.css";
import axiosClient from "../axiosClient";

export default function UpdatePet({ embedded, pet, onClose, onSubmit}) {
  const [dewormed, setDeworm] = useState(false);
  const [vaccinated, setVaccinated] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  // ✅ formData keys match your input `name`s and preview usage
  const [formData, setFormData] = useState({
    petName: "",
    age: "",
    gender: "",
    breed: "",
    behavior: "",
    fee: "",
    status: "",
  });

  
 const loadPetData = () => {
  
    // TODO: replace this with real API call using petId
    const petToUpdate = {
      petName: pet.petName,
      petAge: pet.petAge,
      petGender: pet.petGender,
      petBreed: pet.petBreed,
      petBehavior: pet.petBehavior,
      dewormingUpToDate: pet.dewormingUpToDate,
      vaccinationUpToDate: pet.vaccinationUpToDate,
      petFee: pet.petFee,
      petProfileStatus: pet.petProfileStatus, // or "DRAFT"
      imageUrl: pet.profilePicture, // could be a URL later
    };

    setFormData({
      petName: petToUpdate.petName,
      age: String(petToUpdate.petAge),
      gender: petToUpdate.petGender=== true ? "Female" : "Male",
      breed: petToUpdate.petBreed,
      behavior: petToUpdate.petBehavior,
      fee: String(petToUpdate.petFee),
      status:
        petToUpdate.petProfileStatus === true ? "Active" : "Draft",
    });

    setDeworm(petToUpdate.dewormingUpToDate);
    setVaccinated(petToUpdate.vaccinationUpToDate);

    if (petToUpdate.imageUrl) {
      setPreview(petToUpdate.imageUrl);
    }
  }
  
  
useEffect(() => {
  loadPetData();
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
      setFormData({
      petName: pet.petName,
      age: String(pet.petAge),
      gender: pet.petGender=== true ? "Female" : "Male",
      breed: pet.petBreed,
      behavior: pet.petBehavior,
      fee: String(pet.petFee),
      status:
        pet.petProfileStatus === true ? "Active" : "Draft",
    });

    setDeworm(pet.dewormingUpToDate);
    setVaccinated(pet.vaccinationUpToDate);
    setPreview(pet.profilePicture);
    setImage(null);//-------------------------------------------check if is working on save
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
   const ok = window.confirm(
        "Are you sure you want to delete this pet profile? \nThis action can't be undone. \nYou can hide the profile instead."
    );
    if (!ok) {return;}
    try {    
      await axiosClient.delete(`/api/v1/pets/${pet.petId}/deletePet`);
      alert("Pet profile succesfully deleted!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Delete failed. Please try again.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

  
    if (
      // !formData.petName ||
      !formData.age ||
      !formData.breed ||
      !formData.behavior ||
      !formData.fee ||
      !formData.status
      
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    
    if (image) {
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
    }

    try {
      const payload = {
        petId: pet.petId,
        petAge: parseInt(formData.age),
        petBehavior: formData.behavior,
        dewormingUpToDate: dewormed,
        vaccinationUpToDate: vaccinated,
        petFee: parseFloat(formData.fee),
        petProfileStatus: formData.status === "Active"? true:false, 
        // plus whatever your backend needs to identify the pet (id/uid)
      };

      const apiURL = "/api/v1/pets/updatePet";

      const formDataToSend = new FormData();
      formDataToSend.append(
        "Pet",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );
      if (image) {
        formDataToSend.append("file", image);
      }

      await axiosClient.post(apiURL, formDataToSend);
      alert("Pet updated successfully! 🎉");
      setError("");
      // maybe navigate back to listings here
    } catch (err) {
      if (err.response && err.response.data) {
        const backendError =
          err.response.data.error ||
          err.response.data.message ||
          "Unknown error";
        setError(backendError);
      } else {
        setError(err.message || "Something went wrong");
      }
    }
  };

  if (loading) {
    return (
      <div className="page create-pet-page">
        {!embedded && <Header />}
        <p style={{ padding: "2rem" }}>Loading pet data...</p>
        {!embedded && <Footer />}
      </div>
    );
  }

  return (
        <div className="page create-pet-page">
          <div className="create-pet-container">
            {/* LEFT FORM */}
            <div className="create-pet-form">
              <h1>Update Pet Profile</h1>
              {error && <p className="error-message">{error}</p>}

              <div className="grid-2">
                <label>
                  Pet Name
                  <input
                    name="petName"
                    value={formData.petName}
                    // onChange={handleChange} 
                    disabled

                  />
                </label>
              </div>

              <div className="grid-3">
                <label>
                  Age (years)
                  <input
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Gender
                  <select
                    name="gender"
                    value={formData.gender}
                    // onChange={handleChange}
                    disabled

                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>

                <label>
                  Breed
                  <input
                    name="breed"
                    value={formData.breed}
                    // onChange={handleChange}
                    disabled
                  />
                </label>
              </div>

              <label>
                Behavior / Temperament
                <textarea
                  name="behavior"
                  value={formData.behavior}
                  onChange={handleChange}
                />
              </label>

              <div className="grid-2 checkbox-row">
                <label>
                  <input
                    type="checkbox"
                    checked={dewormed}
                    onChange={() => setDeworm(!dewormed)}
                  />
                  Deworming up to date
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={vaccinated}
                    onChange={() => setVaccinated(!vaccinated)}
                  />
                  Vaccination up to date
                </label>
              </div>

              <div className="grid-2">
                <label>
                  Listing Fee (CAD)
                  <input
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Profile Picture
                  <input type="file" accept="image/*" onChange={handleImage} ref={fileInputRef}/>
                </label>
              </div>

              <label>
                Status
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Draft">Draft</option>
                  <option value="Active">Active</option>
                </select>
              </label>

              <div className="button-row">
                <button className="btn-save" onClick={handleSave}>
                  Save Changes
                </button>
                <button className="btn-reset" onClick={handleReset}>
                  Reset Profile
                </button>
                <button className="btn-delete" onClick={handleDelete}>
                  Delete Pet
                </button>
                <button className="btn-back" onClick={onClose}>
                  Back to My Listings
                </button>
                {/* <Link className="btn-back"  onClick={onClose}> Back to My Listings </Link> */}
              </div>
            </div>

            {/* RIGHT PREVIEW */}
            <div className="pet-preview">
              <div className="preview-card">
                {preview ? (
                  <img src={preview} alt="pet preview" />
                ) : (
                  <div className="img-placeholder">Pet Image Preview</div>
                )}
                <h2>{formData.petName || "Pet Name"}</h2>
                <p className="tag">{formData.status}</p>

                <p>
                  {formData.breed || "Breed"} • {formData.age || "--"} years •{" "}
                  {formData.gender || "--"}
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
