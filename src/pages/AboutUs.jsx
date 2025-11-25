import { useState } from "react";
import '../styles/Header.css';
import '../styles/AboutUs.css';
import Header from "../components/Header";


export default function AboutUs() {
  return (
    <div className="page">
      <Header />

      <div className="about-container">

        {/* --- Intro / Mission Section --- */}
        <section className="about-section">
          <h1 className="about-title">About Us</h1>
          <p className="about-text">
            Welcome to <strong>My Pet, Your Pet</strong> — a platform created from
            our love for animals and the joy they bring into our lives <strong>and of course getting a good grade</strong>. Our mission
            is to connect pet lovers across the country, helping people share
            companionship, support responsible pet care, and build a warm
            community centered around pets.
          </p>
        </section>

        {/* --- Team Section --- */}
        <section className="about-team">
          <h2 className="about-subtitle">Meet the Team</h2>

          <div className="team-grid">


           
            <div className="team-member">
              <img
                src="PHOTO_URL_"
                alt="Team Member "
                className="team-photo"
              />
              <h3 className="team-name">Xochilt Sucre Masea</h3>
              <p className="team-role">Something</p>
              <p className="team-bio">
                Write Something here
              </p>
            </div>

            
            <div className="team-member">
              <img
                src="PHOTO_URL_"
                alt="Team Member "
                className="team-photo"
              />
              <h3 className="team-name">Sandali Silva</h3>
              <p className="team-role">Write Something here</p>
              <p className="team-bio">
                Write Something here
              </p>
            </div>

          
            <div className="team-member">
              <img
                src="img"
                alt="Team Member"
                className="team-photo"
              />
              <h3 className="team-name">Maneesha Eeshwara </h3>
              <p className="team-role">Write Something here</p>
              <p className="team-bio">
                Write Something here
              </p>
            </div>

            <div className="team-member">
              <img
                src="src\assets\phoebe.jpg"
                alt="Phoebe"
                className="team-photo"
              />
              <h3 className="team-name">Phoebe Amable</h3>
              <p className="team-role">Write Something here</p>
              <p className="team-bio">
                What can I actually write about myself sitting in the dark at 2am full of caffeine but too bored to do anything serious.
              </p>
            </div>
             <div className="team-member">
              <img
                src="src\assets\gian.png"
                alt="GPT"
                className="team-photo"
              />
              <h3 className="team-name">Gian-Pierre Toussaint</h3>
              <p className="team-role">Debugging & Computational Encouragement Advisor</p>
              <p className="team-bio">
                a certain cloud-based assistant who
            never sleeps, always debugs, and drinks absolutely zero coffee. ☁️🤖
              </p>
            </div>


          </div>
        </section>


      </div>
    </div>
  );
}

// export default function AboutUs() {
//   const [error, setError] = useState("");

//   const test = async (e) => {
//     e.preventDefault();
//     setError("");

//     // try {
//     //   const response = await axiosClient.get("/api/v1/testing");
//     //   //for now we need to update the password in axiosClient.js

//     //   console.log(response.data); // should be { status: "OK", version: "v1" }
//     //   alert("Test created successfully! 🎉");
//     // } catch (err) {
//     //   console.error(err);
//     //   setError(
//     //     err.response?.data?.message ||
//     //     err.message ||
//     //     "Something went wrong"
//     //   );
//     // }

//     let postObject = {
//   "fullName": "Phoebe Amable",
//   "email": "phoebe2569@example.com",
//   "address": "Vancouver",
//   "customerInfo": {
//     "governmentID": "ABC123",
//     "age": 25,
//     "gender": "Female",
//     "location": "Canada",
//     "profileStatus": "Pending Verification"
//   }
// }
//     try {
//       const response = await axiosClient.post("/api/registration/petOwner", postObject);
//       //for now we need to update the password in axiosClient.js

      
//       alert("Test created successfully! 🎉");
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message ||
//         err.message ||
//         "Something went wrong"
//       );
//     }
//   };

//   return (
//     <div className="page">
//       <Header />
//       <h1>About Us</h1>
//       <p>Coming soon 🐾</p>
//       <p>A short paragraph about who we are and the team</p>

//       <button onClick={test}>Test API</button>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }