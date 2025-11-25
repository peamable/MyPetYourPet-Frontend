import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/OwnerListings.css";
import PetCard from "../components/PetCard";
// import EditAPet from "../pages/EditAPet";
import axiosClient from '../axiosClient';//----------------------------------------
// import SeekerProfileCard from "../components/UserProfileCard";
import { useState, useEffect } from "react";

export default function OwnerListings({ embedded, accountId }) {

  const [ownerpets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);//----------------------------------------------
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchPets = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axiosClient.get(`/api/v1/pets/${accountId}/getOwnerPets`);
        const data = res.data;           
        setPets(data);
      }
     catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  },[]);

  const handleViewPet = (petId) => {
    // later: navigate(`/pets/${petId}`);
    console.log("Clicked pet id:", petId);
  };

 // import your pet cards, or just leave the JSX inline

 
  return (
    <div className="owner-listings-page">
      {!embedded && <Header />}

      {/* NEW wrapper for this page */}
      <div className="owner-page">
        {/* LEFT: profile column */}
        {/* <div className="owner-profile-column">
          <SeekerProfileCard
            name="Scarlet Hansen"
            role="Owner"
            location="Vancouver, BC"
            email="scarlet@email.com"
            phone="+1 (604) 555-0123"
            bio="Pet owner and dog enthusiast. Loves sharing playtime and care tips."
            preferences={["Dog", "Friendly", "Active"]}
            onEdit={() => {}}
            onDelete={() => {}}
          /> */}

          {/* your left-side nav if you have it */}
          {/* <div className="owner-menu">
            <button className="menu-item menu-item--active">My Listings</button>
            <button className="menu-item">Messages</button>
            <button className="menu-item">Payments</button>
            <button className="menu-item">Support</button>
          </div>
        </div> */}

        {/* RIGHT: pets column */}
        <div className="owner-pets-column">
          {ownerpets.length === 0 ? (<p> You have no pets listed. Create a pet to view here 🐾</p>) :(
            ownerpets.map((pet) => 
            <PetCard
                key={pet.petId}
                name={pet.petName}
                breed={pet.petBreed}
                behavior={pet.petBehavior}
                fee={pet.petFee}
                image={pet.profilePicture}
                status={pet.petProfileStatus ? "Active" : "Hidden"}
                tags={[
                    pet.petGender === 1 ? "Female" : "Male",
                    `${pet.petAge} yrs`,
                ]}
                onEdit={() => {
                  console.log("Editing pet:", pet);   // <-- your debug log
                  setSelectedPet(pet);
                }}
                />))}
            
          {/* ownerpets.map((pet) => <PetCard key={pet.id} pet={pet} />))} */}
          {/* just plop your existing pet cards here */}
          {/* Buddy card */}
          {/* Luna card */}
        </div>

      {/* This is an overlay to show the pet details */}
      {selectedPet && (
       <EditAPet
          embedded={true} 
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
      />)}
      </div>
     {!embedded && <Footer />}
    </div>
  );
};

// export default OwnerListings;
