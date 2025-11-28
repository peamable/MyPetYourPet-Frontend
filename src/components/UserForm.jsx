import "../styles/Register.css";
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function UserForm({

    mode = "create",
    initialValues = {},  // for edit mode
    onSubmit,
    
}) 
{
    const user = initialValues.role; //dynamically change this
    const isEdit = mode === "edit"
    const navigate = useNavigate()
    const handleExit = ()=> {
      if (user === "Owner")
        {navigate("/owner/dashboard")}
    else{
      navigate("/seeker/dashboard")
    } }


    const [formData, setFormData] = useState({

        fullName: initialValues.fullName || "",
        role: initialValues.role || "",
        email: initialValues.email || "",
        phone: initialValues.phone || "",
        age: initialValues.age || "",
        gender: initialValues.gender || "",
        // idType: initialValues.idType || "",
        // idNumber: initialValues.idNumber || "",//NOT WORKING
        address: initialValues.address|| "",
        password: "",
        bio:"",
        confirmPassword: "",
    
      });

        const [govIdFile, setGovIdFile] = useState(null);
        const [backCheckFile, setBackCheckFile] = useState(null);
        const [image, setImage] = useState(null);
        const [preview, setPreview] = useState(initialValues.profilePicUrl || "https://tse4.mm.bing.net/th/id/OIP.eDOsXt3XNYFxCikumFhjjQHaHa?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3");
        const [error, setError] = useState("");

        useEffect(() => {

          if(!isEdit) return;


        setFormData((prev) => ({
            ...prev,
            fullName: initialValues.fullName || "",
            role: initialValues.role || "",
            email: initialValues.email || "",
            phone: initialValues.phone || "",
            age: initialValues.age || "",
            gender: initialValues.gender || "",
            // idType: initialValues.idType || "",
            // idNumber: initialValues.idNumber || "",
            address: initialValues.address || "",
            bio:initialValues.bio || "You have no bio, Write something about yourself here",
            }));
            if (initialValues.profilePicUrl) {
            setPreview(initialValues.profilePicUrl);
            }
        }, [isEdit, initialValues]);
            
        // const handleChange = (e) => {  // what to do the form fields change
        //   setFormData({ ...formData, [e.target.name]: e.target.value });
        // };
        const handleChange = (e) => {
         const { name, value } = e.target;

         setFormData((prev) => ({
            ...prev,
         [name]: value,
            }));   };
       
      
        // const handleImage = (e) => {
        //   const file = e.target.files[0];
        //   setImage(file);
      
        //   const reader = new FileReader();
        //   reader.onloadend = () => setPreview(reader.result);
        //   reader.readAsDataURL(file);
        // };

      //   const handleImage = (e) => {
      //   const file = e.target.files?.[0];
      //   if (!file) return;
      //   setImage(file);

      //   const reader = new FileReader();
      //   reader.onloadend = () => setPreview(reader.result);
      //   reader.readAsDataURL(file);
      //  };

      const handleImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const { name } = e.target;

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
          setError("Only JPG, PNG, or WEBP images are allowed.");
          return;
        }
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          setError("Image must be smaller than 5MB.");
          return;
        }

        setError("");

        if (name === "Picture") {
          setImage(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
            console.log("Preview set:", reader.result);};
          reader.readAsDataURL(file);
        } else if (name === "GovId") {
          setGovIdFile(file);
        } else if (name === "BackCheck") {
          setBackCheckFile(file);
        }
      };


        const handleSubmit = async (e) => {  // what to do when the user clicks submit
        e.preventDefault();
        setError("");
            if (
              !isEdit&&(
            !formData.fullName ||
            !formData.email ||
            !formData.phone ||
            !formData.role||
            !formData.age ||
            !formData.gender ||
            !formData.address ||
            !image||!govIdFile||!backCheckFile)
            ) {
            alert("Please fill out all required fields and select an image.");
            return;
            }
            // if(image){
            //   const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
            // if (!allowedTypes.includes(image.type)) {
            // setError("Only JPG, PNG, or WEBP images are allowed.");
            // return;
            // }
            // const maxSize = 5 * 1024 * 1024;
            // if (image.size > maxSize) {
            // setError("Image must be smaller than 5MB.");
            // return;
            // }
            // }
            
            if (!isEdit) {
            // create mode: must match
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match.");
                return;
            }
            } else {

            const hasPasswordInput = formData.password || formData.confirmPassword;

            if (hasPasswordInput) {
                if (!formData.password || !formData.confirmPassword) {
                setError("Please fill in both password fields to change your password.");
                return;
                }
                if (formData.password !== formData.confirmPassword) {
                setError("New passwords do not match.");
                return;
                }
            }
            }
          // try {
          //   await onSubmit({ ...formData, image });
          //   } catch (err) {
          //     setError(err.message || "Something went wrong");
          //   }
            try {
                // alert("User Form before await")
                // console.log("FORMDATA:", formData);
                // console.log("IMAGE:", image);
                // console.log("GOVID:", govIdFile);
                // console.log("BACKCHECK:", backCheckFile);
              await onSubmit({ ...formData, image, govIdFile, backCheckFile, });
            } catch (err) {
              alert("userform "+err.message);//------------------------------------
              setError(err.message || "Something went wrong");
            }
        };
        

    return(
        <form onSubmit={handleSubmit} className="register-form">
          {preview && (
                <div className="profile-preview">
                    <img
                    src={preview}
                    alt="Profile preview"
                    style={{ width: "120px", height: "120px", borderRadius: "50%" }}
                    />
                </div>
            )}

          <label>Full Name *</label>
          <input name="fullName" 
          value= {formData.fullName} 
          onChange={handleChange}
          required />

          <label>Role *</label>
          <select name="role" value={formData.role}
          onChange={handleChange} disabled={isEdit} required>
            <option value="">Select</option>
            <option value="Owner">Owner</option>
            <option value="Seeker">Seeker</option>
          </select>

          <label>Email *</label>
          <input type="email" name="email" disabled={isEdit}
          value= {formData.email} onChange={handleChange} required />

          <label>Phone *</label>
          <input type="tel" name="phone" onChange={handleChange} 
          value= {formData.phone}/>

          {/* Government ID Section */}
          {!isEdit && (<div className="gov-section">
            <p className="gov-label">Government ID and Background Check</p>
            <label>Government ID Picture *
            <input type="file" accept="image/*" name="GovId" onChange={handleImage} />
            </label>
            <label>Background Check Picture *
            <input type="file" accept="image/*" name="BackCheck" onChange={handleImage} />
            </label>
            {/* <p className="gov-label">Government ID</p> */}
            {/* <label>ID Type</label>
            <select name="idType" onChange={handleChange} value= {formData.idType} disabled={isEdit} required>
            <option value="">Select</option>
            <option value="Driver's License">Driver's License</option>
            <option value="Passport">Passport</option>
            <option value="State/Provincial Id">State/Provincial Id</option>
            </select>

            <label>ID Number</label> 
            <input name="idNumber" onChange={handleChange} value={formData.idNumber} disabled={isEdit} required/> */}
            <p className="gov-note">
              We only use this for verification. It will be encrypted and never shared publicly.
            </p>
          </div> )}

          <label>Location *</label>
          <input name="address" onChange={handleChange} value= {formData.address}/>

          <label>Year of Birth *</label>
            <input
              type="number"
              name="yearOfBirth"
              min="1970"
              max={new Date().getFullYear()}
              onChange={(e) => {
                const year = e.target.value;
                const age = new Date().getFullYear() - year;

                setFormData((prev) => ({
                  ...prev,
                  yearOfBirth: year,
                  age: age >= 0 ? age : ""
                }));
              }}
              value={formData.yearOfBirth || ""}
            />


          <label>Age *</label>
          <input type="number" name="age" onChange={handleChange}
          value= {formData.age || ""} style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }} 
          readOnly/>

          {/* <label>Gender</label>
          <select name="gender" onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select> */}
          <label>Gender *</label>
          <input name="gender" onChange={handleChange} 
         value= {formData.gender}/>

       
         {isEdit && (
            <p className="small-note">
                Upload a new picture only if you want to change your current one.
          </p>
         )}
          <label>
          Profile Picture *
          <input type="file" accept="image/*"  name="Picture" onChange={handleImage} />
          </label>

          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Write a short bio to help users know a bit about you"
          />

            {isEdit && (<p className="small-note">
                Leave password fields empty if you don't want to change your password.
            </p>)}
            
          <label>{isEdit ? "New Password" : "Password"}</label> 

          {/* <label>Password</label>  */}
          <input
            type="password"
            name="password"
            placeholder={isEdit ? "******": ""}
            onChange={handleChange}
            {...(!isEdit && { required: true })}  
            />
            

          <label>{isEdit ? "Confirm New Password" : "Confirm Password"}</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder={isEdit ? "******": ""}
            onChange={handleChange}
            {...(!isEdit && { required: true })}  
            />

          {(!isEdit &&
          <div className="terms">
            <input type="checkbox" required />
            <label>
              I agree to the <a href="#">Terms & Conditions</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div>)}
          {isEdit && <button className="btn-primary" type = "button" onClick={handleExit}>Exit Form</button>}
          {/* //exit should navigate back to the dashboard based on usertype */}

          <button type="submit" className="btn-primary">{isEdit ? "Save Changes" : "Create Account"}</button>
          {error && <p className="error-text small-note">{error}</p>}
        </form>
    );
}