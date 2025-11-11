import '../styles/Header.css';
import React, {useEffect, useState} from "react"
import Header from "../components/Header";
import PetDetailCard from "../components/petDetailCard"
import PetCard from "../components/PetCard";
import "../styles/PetListPage.css";

export default function PetListPage() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [selectedPet, setSelectedPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

//with some modifications but this is where we request for all the pets
//   // Fetch pets from backend once when page loads
//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await fetch("api here");
//         if (!res.ok) {
//           throw new Error("Failed to load pets");
//         }

//         const data = await res.json();
//         setPets(data);
//       } catch (err) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPets();
//   }, []);

 // using dummy data instead of backend fetch
  useEffect(() => {
    const dummyPets = [
      {
        petId: 1,
        petName: "Buddy",
        petBreed: "Golden Retriever",
        petBehavior: "Friendly and energetic. Loves long walks and fetch.",
        petFee: 25.0,
        petAge: 3,
        petGender: 1,
        dewormingUpToDate: true,
        vaccinationUpToDate: true,
        petProfileStatus: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400",
          owner: {
        name: "Scarlet Hansen",
        location: "Vancouver, BC",
        rating: 4.9,
        listingsCount: 3,
        about:
          "Dog lover and active pet owner. Loves sharing Buddy’s adventures with seekers.",
          }
      },
      {
        petId: 2,
        petName: "Luna",
        petBreed: "French Bulldog",
        petBehavior: "Playful and cuddly. Great for small apartments.",
        petFee: 18.5,
        petAge: 2,
        petGender: 0,
        dewormingUpToDate: true,
        vaccinationUpToDate: true,
        petProfileStatus: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1556228578-1e4cde67f7d1?w=400",
          owner: {
        name: "Scarlet Hansen",
        location: "Vancouver, BC",
        rating: 4.9,
        listingsCount: 3,
        about:
          "Dog lover and active pet owner. Loves sharing Buddy’s adventures with seekers.",
          }
      },
      {
        petId: 3,
        petName: "Whiskers",
        petBreed: "Siamese",
        petBehavior: "Independent but affectionate. Prefers quiet homes.",
        petFee: 15.0,
        petAge: 4,
        petGender: 0,
        dewormingUpToDate: false,
        vaccinationUpToDate: true,
        petProfileStatus: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400",
          owner: {
        name: "Scarlet Hansen",
        location: "Vancouver, BC",
        rating: 4.9,
        listingsCount: 3,
        about:
          "Dog lover and active pet owner. Loves sharing Buddy’s adventures with seekers.",
          }
      },
      {
        petId: 4,
        petName: "Kiwi",
        petBreed: "Parrot",
        petBehavior: "Talkative and social. Enjoys human company and music.",
        petFee: 12.0,
        petAge: 1,
        petGender: 1,
        dewormingUpToDate: true,
        vaccinationUpToDate: true,
        petProfileStatus: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1589923188900-7fefb8ed941e?w=400",
          owner: {
        name: "Scarlet Hansen",
        location: "Vancouver, BC",
        rating: 4.9,
        listingsCount: 3,
        about:
          "Dog lover and active pet owner. Loves sharing Buddy’s adventures with seekers.",
          }
      },
        {
        petId: 5,
        name: "Honey",
        petBreed: "Something",
        petBehavior: "Talkative and social. Enjoys human company and music.",
        petFee: 12.0,
        petAge: 1,
        petGender: 1,
        dewormingUpToDate: true,
        vaccinationUpToDate: true,
        petProfileStatus: 1,
        imageUrl:
          "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/dachshund.jpg?crop=1.00xw:0.668xh;0,0.260xh&resize=980:*",
          owner: {
        name: "Scarlet Hansen",
        location: "Vancouver, BC",
        rating: 4.9,
        listingsCount: 3,
        about:
          "Dog lover and active pet owner. Loves sharing Buddy’s adventures with seekers.",
          }
      },
        {
        petId: 6,
        name: "Candy",
        breed: "Somethng",
        petBehavior: "Talkative and social. Enjoys human company and music.",
        petFee: 12.0,
        petAge: 1,
        petGender: 1,
        dewormingUpToDate: true,
        vaccinationUpToDate: true,
        petProfileStatus: 1,
        imageUrl:
          "https://hips.hearstapps.com/hmg-prod/images/cute-corgi-posing-in-between-its-owners-legs-royalty-free-image-1752090062.pjpeg?crop=0.66672xw:1xh;center,top&resize=980:*",
          owner: {
        name: "Scarlet Hansen",
        location: "Vancouver, BC",
        rating: 4.9,
        listingsCount: 3,
        about:
          "Dog lover and active pet owner. Loves sharing Buddy’s adventures with seekers.",
          }
      },
    ];

    setPets(dummyPets);
  }, []);

  // Filter + search in memory
  const filteredPets = pets.filter((pet) => {
    const q = search.toLowerCase().trim();

    const matchesSearch =
      !q ||
      pet.name?.toLowerCase().includes(q) ||
      pet.breed?.toLowerCase().includes(q) ||
      pet.location?.toLowerCase().includes(q);

    const matchesSpecies =
      speciesFilter === "all" ||
      pet.species?.toLowerCase() === speciesFilter.toLowerCase();

    return matchesSearch && matchesSpecies;
  });

  // When a card is clicked (placeholder for now)
  const handleViewPet = (petId) => {
    // later: navigate(`/pets/${petId}`);
    console.log("Clicked pet id:", petId);
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
                placeholder="Search by name, breed, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />

                <select
                className="pet-filter-select"
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
                >
                <option value="all">All types</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="bird">Birds</option>
                <option value="other">Other</option>
                </select>
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
                image={pet.imageUrl}
                status={pet.petProfileStatus === 1 ? "Active" : "Hidden"}
                tags={[
                    pet.petGender === 1 ? "Male" : "Female",
                    `${pet.petAge} yrs`,
                ]}
                onPreview={() => setSelectedPet(pet)} // 👈 show detail card
                />
            ))}
            </div>
            

        </div>
        {/* This is an overlay to show the pet details */}
      <PetDetailCard
            pet={selectedPet}
            onClose={() => setSelectedPet(null)}
            onRequest={() =>
            console.log("Request reservation for:", selectedPet?.petName)
            }
      />
    </div>
  );
}