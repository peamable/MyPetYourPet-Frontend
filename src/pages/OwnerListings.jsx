import Header from "../components/Header";
import SeekerProfileCard from "../components/SeekerProfileCard";
// import your pet cards, or just leave the JSX inline

function OwnerListingsPage() {
  return (
    <div>
      <Header />

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
    </div>
  );
}

export default OwnerListingsPage;
