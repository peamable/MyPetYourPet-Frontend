import '../styles/Header.css';
import React, {useEffect, useState} from "react"
import Header from "../components/Header";
import PetDetailCard from "../components/petDetailCard"
import PetCard from "../components/PetCard";
import "../styles/PetListPage.css";
import axiosClient from '../axiosClient';

export default function PetListPage() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  //for date picker
  const getMinDateTime = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); 
  return now.toISOString().slice(0, 16);
};
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");




  //with some modifications but this is where we request for all the pets
  // the response can look like the dummy data below. If it does, nothing much needs to change
  //   // Fetch pets from backend once when page loads
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        setError("");

        //.........................................................................

        // const res = await fetch("http://localhost:8080/api/v1/pets/getAllPets");
        // if (!res.ok) {
        //   throw new Error("Failed to load pets");
        // }
        // const data = await res.json();

        //......................................................................
        //  const res = axiosClient.get("/api/v1/pets/getAllPets")
        // .then(res => {
        //   setPets(res.data)});

        const res = await axiosClient.get("/api/v1/pets/getAllPets");
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
  
  }, []);

  useEffect(() => {
    if (!selectedPet?.customerId || selectedPet?.owner) return;


    const fetchOwner = async () => {
      if (!selectedPet?.customerId) return;
      try {
        //I will change to axios later
        const res = await fetch(`http://localhost:8080/api/customerAccount/getOwnerDetails/${selectedPet.customerId}`);
        if (!res.ok) throw new Error("Failed to load owner info");
        const ownerData = await res.json();

        // Attach owner to selectedPet
        setSelectedPet((prev) => ({ ...prev, owner: ownerData }));
      } catch (err) {
        console.error("Owner fetch error:", err);
      }
    };

    fetchOwner();
  }, [selectedPet]);



  // Filter + search in memory
 
  const filteredPets = pets
    .filter((pet) => pet.petProfileStatus) 
    .filter((pet) => {
    const q = search.toLowerCase().trim();

    const matchesSearch =
      !q ||
      pet.petName?.toLowerCase().includes(q) ||
      pet.petBreed?.toLowerCase().includes(q) ||
      pet.petBehavior?.toLowerCase().includes(q);

    // const matchesSpecies =
    //   speciesFilter === "all" ||
    //   pet.species?.toLowerCase() === speciesFilter.toLowerCase();
    return matchesSearch;
    // return matchesSearch && matchesSpecies;
  });

  // When a card is clicked (placeholder for now)
  const handleViewPet = (petId) => {
    // later: navigate(`/pets/${petId}`);
    console.log("Clicked pet id:", petId);
  };

  const checkAvailability = async (petId, startDate, endDate) => {
  try {
    const res = await axiosClient.get("/api/reservations/check-availability", {
      params: {
        petId,
        startDate,  // must match your backend param names
        endDate
      }
    });

    return res.data.available;  // true or false
  } catch (error) {
    console.error("Availability check error:", error);
    return false; // safest fallback
  }
};

  //reservation handler
//  const handleRequestReservation = async (pet) => {
//   if (!pet) return;
//   const accountId = localStorage.getItem("accountId"); // Logged-in user (seeker)

//   if (!accountId) {
//     alert("Please login to request!");
//     return;
//   }

const handleRequestReservation = async (pet) => {
  if (!pet) return;

  const accountId = localStorage.getItem("accountId");
  if (!accountId) {
    alert("Please login to request!");
    return;
  }
  const status = localStorage.getItem("status");

    if (status?.toLowerCase().includes("pending verification")) {
      alert("Your account must be verified before making requests.");
      return;
    }

  if (!startDate || !endDate) {
    alert("Please choose your reservation dates.");
    return;
  }

  // Format to "YYYY-MM-DD HH:mm:ss" for backend
  const formatDateForBackend = (value) => value.replace("T", " ") + ":00";

  const formattedStart = formatDateForBackend(startDate);
  const formattedEnd = formatDateForBackend(endDate);

  // ⭐ Step 1: check availability
  const available = await checkAvailability(
    pet.petId,
    formattedStart,
    formattedEnd
  );

  if (!available) {
    alert("❌ Pet is NOT available for that date & time.");
    return;
  }
  if (new Date(endDate) <= new Date(startDate)) {
  alert("End date & time must be AFTER the start date & time.");
  return;
  }
    // TODO: Replace with user-chosen dates (temporary hardcoded)
    // const startDate = new Date("2025-02-01T10:00:00");
    // const endDate = new Date("2025-02-01T18:00:00");

     try {
    const res = await axiosClient.post("/api/reservations/seeker/create", {
      petId: pet.petId,
      customerId: accountId,  // seeker (logged in user)
      ownerId: pet.owner?.ownerId, // If backend supports owner reference
      startDate: "2025-02-01 10:00:00", 
      endDate: "2025-02-01 18:00:00",
      serviceFee: pet.petFee, // dynamic fee from DB
      serviceAmount: 50, 
      petResStatus: "Pending"
    });

    localStorage.setItem("petFeeForReservation", pet.petFee) 

    console.log("Reservation saved:", res.data);
    alert("Reservation requested successfully!");
    setSelectedPet(null);
  } catch (err) {
    console.error("Reservation error:", err);
    alert("Failed to request reservation");
  }
  };
 


  return (
    <div className="page">
      <Header />
      
      <div className='pet-list-page'>
            {/* Top controls: title + search + filter */}
            <div className="pet-list-header">
            <div>
                <h1 className="pet-list-title">All Pets</h1>
                <p className="pet-list-subtitle">
                Browse pets from all owners. Search by name, breed, or location.
                </p>
            </div>

            <div className="pet-list-controls">
                <input
                type="text"
                className="pet-search-input"
                placeholder="Search by name, breed, or behaviour..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />

               {/* this for "future installations with different pets" */}
                {/* <select
                className="pet-filter-select"
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
                >
                <option value="all">All types</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="bird">Birds</option>
                <option value="other">Other</option>
                </select> */}
            </div>
            </div>

            {/* Status/loading/error */}
            {loading && <div className="pet-list-status">Loading pets…</div>}
            {error && <div className="pet-list-error">{error}</div>}
            {!loading && !error && filteredPets.length === 0 && (
            <div className="pet-list-status">No pets match your search yet.</div>
            )}

            {/* Pet cards list */}
            <div className="pet-list-grid">
            {filteredPets.map((pet) => (
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
                onPreview={() => setSelectedPet(pet)} // show detail card
                />
            ))}
            </div>
            

        </div>
        {/* This is an overlay to show the pet details */}
      <PetDetailCard
            pet={selectedPet}
            onClose={() => setSelectedPet(null)}
            onRequest={handleRequestReservation}
            >
              
              <div className="date-picker-container">
                  <label>Start Date & Time:</label>
                  <input
                  type="datetime-local"
                  min={getMinDateTime()}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />

                  <label>End Date & Time:</label>
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
            </PetDetailCard>
            {/* //onRequest={() =>{handleRequestReservation} */}
            {/* //console.log("Request reservation for:", selectedPet?.petName) //we can have a record added to the reservation table here */}
            {/* } */}
            
     
    </div>
  );
}

