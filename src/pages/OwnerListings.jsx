import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/OwnerListings.css";
import PetCard from "../components/PetCard";

import axiosClient from '../axiosClient';
import { useState, useEffect } from "react";

export default function OwnerListings({ embedded, accountId, onEditPet }) {

  const [ownerpets, setPets] = useState([]);
  //const [selectedPet, setSelectedPet] = useState(null);//----------------------------------------------
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
                  // setSelectedPet(pet);
                  onEditPet(pet);
                }}
                />))}
            
        </div>

      </div>
     {/* {!embedded && <Footer />} */}
    </div>
  );
};

