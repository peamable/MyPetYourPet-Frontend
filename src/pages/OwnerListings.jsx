import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/OwnerListings.css";

export default function OwnerListings({ embedded }) {
//   // Example data (Later replace with API data)
//   const owner = {
//     name: "Scarlet Hansen",
//     location: "Vancouver, BC",
//     listings: 3,
//     rating: 4.9,
//   };

//   const pets = [
//     {
//       name: "Buddy",
//       breed: "Golden Retriever",
//       status: "Active",
//       description: "Friendly, loves kids, perfect for walks and cuddles",
//       tags: ["Large", "Child-Friendly", "Vaccinated"],
//       image:
//         "https://images.pexels.com/photos/3299907/pexels-photo-3299907.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//     {
//       name: "Luna",
//       breed: "French Bulldog",
//       status: "Hidden",
//       description: "Playful and Social, great for short park hangouts.",
//       tags: ["Small", "City-Friendly", "Vaccinated"],
//       image:
//         "https://images.pexels.com/photos/1814062/pexels-photo-1814062.jpeg?auto=compress&cs=tinysrgb&w=600",
//     },
//   ];
import SeekerProfileCard from "../components/SeekerProfileCard";
// import your pet cards, or just leave the JSX inline

function OwnerListingsPage() {
  return (
    <div className="owner-listings-page">
      {!embedded && <Header />}

      {/* NEW wrapper for this page */}
      <div className="owner-page">
        {/* LEFT: profile column */}
        <div className="owner-profile-column">
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
          />

          {/* your left-side nav if you have it */}
          <div className="owner-menu">
            <button className="menu-item menu-item--active">My Listings</button>
            <button className="menu-item">Messages</button>
            <button className="menu-item">Payments</button>
            <button className="menu-item">Support</button>
          </div>
        </div>

        {/* RIGHT: pets column */}
        <div className="owner-pets-column">
          {/* just plop your existing pet cards here */}
          {/* Buddy card */}
          {/* Luna card */}
        </div>
      </div>

     {!embedded && <Footer />}
    </div>
  );
}

export default OwnerListingsPage;
