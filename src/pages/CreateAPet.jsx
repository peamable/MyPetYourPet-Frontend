import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../styles/CreateAPet.css";

export default function CreateAPet() {
  const [formData, setFormData] = useState({
    petName: "",
    age: "",
    gender: "",
    breed: "",
    behavior: "",
    fee: "",
    status: "Draft",
    imageUrl:"",
    // vaccinationStatus:"",
    // dewormingStatus: "", have been apparently set below

  });

  const [dewormed, setDeworm] = useState(false);
  const [vaccinated, setVaccinated] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSave = async (e) => {  // what to do when the user clicks submit
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try{
      //get firebase key to add to the request header

     
       //payload will hold the data we want to send
      const payload = {
      petName: formData.petName,
      age: formData.age,
      gender: formData.gender, 
      breed: formData.breed,
      behavior: formData.behavior,
      fee: formData.fee,
      status:formData.status,  // stored in the backend as int/boolean
      imageUrl:formData.imageUrl,
      //customerId get this somehow,
      dewormed, //true or false
      vaccinated, //true or false
 
      };
      let apiURL = "the api endpoint here"
    
      await axiosClient.post(apiURL, payload);

        alert("Pet created successfully! 🎉");

    } 
    catch (err) {
        setError(err.message || "Something went wrong");
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
      status: "Draft",
    });
    setDeworm(false);
    setVaccinated(false);
    setPreview(null);
  };

  return (
    <div className="page create-pet-page">
      <Header />

      <div className="create-pet-container">
        {/* LEFT FORM */}
        <div className="create-pet-form">
          <h1>Create Pet Listing</h1>

          <div className="grid-2">
            <label>
              Pet Name
              <input name="petName" value={formData.petName} onChange={handleChange} />
            </label>

            <label>
              Pet ID (auto)
              <input disabled value="Auto-Generated" />
            </label>
          </div>

          <div className="grid-3">
            <label>
              Age (years)
              <input name="age" onChange={handleChange} />
            </label>

            <label>
              Gender
              <select name="gender" onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>

            <label>
              Breed
              <input name="breed" onChange={handleChange} />
            </label>
          </div>

          <label>
            Behavior / Temperament
            <textarea name="behavior" onChange={handleChange} />
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
              <input name="fee" onChange={handleChange} />
            </label>

            <label>
              Profile Picture
              <input type="file" accept="image/*" onChange={handleImage} />
            </label>
          </div>

          <label>
            Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Draft</option>
              <option>Active</option>
            </select>
          </label>

          <div className="button-row">
             <button className="btn-save" onClick={handleSave}>Save Listing</button>  {/*Add data to db and go back to listings */}
            <button className="btn-reset" onClick={handleReset}>Reset</button>
            <Link className="btn-back" to= "/owner/ownerlistings">Back to My Listings</Link>
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

      <Footer />
    </div>
  );
}
