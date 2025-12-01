import '../styles/Header.css';
import '../styles/Admin.css';
import { useState,useEffect } from 'react';
import Header from "../components/Header";
import axiosClient from "../axiosClient";


export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(null);


useEffect(() => {
  loadDashboardData();
}, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const pending = await axiosClient.get("/api/admin/pending-verifications");
      const verified = await axiosClient.get("/api/admin/verified-count");

      setPendingUsers(pending.data || []);
      setVerifiedCount(verified.data || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Approve / Decline
  const handleDecision = async (id, action) => {
    try {
      await axiosClient.post(`/api/admin/verify-user/${id}`, { action });
      setSelectedUser(null);
      loadDashboardData();
      alert(`User ${action === "approve" ? "approved" : "declined"} successfully.`);
    } catch (err) {
      console.error(err);
      alert("Action failed.");
    }
  };

  const [expandedDoc, setExpandedDoc] = useState(null); // this Track clicked document
const documents = selectedUser
  ? [
      { id: 1, title: "Profile Photo", image: selectedUser.profilePicture },
      // Add others when available
      { id: 2, title: "Gov Id", image: selectedUser.governmentID},
      { id: 3, title: "Background Check", image: selectedUser.backgroundCheck},
      // { id: 3, title: "Address Proof", image: selectedUser.addressProof },
    ].filter(doc => doc.image) 
  : []; // Return empty array if no user selected


  useEffect(() => {
    loadDashboardData();
    loadAdminDetails(); // fetch admin data
  }, []);
  const loadAdminDetails = async () => {
  try {
    const res = await axiosClient.get("/api/admin/details");
    setAdmin(res.data);
  } catch (error) {
    console.error("Failed to fetch admin details:", error);
  }
};

  return (
    <div className="page">
      <Header />

      <div className="admin-container">

        {/* Main Admin Info */}
        <div className="admin-card">
          <img
            src={admin?.profilePicture || "https://picsum.photos/200/200"}
            alt="Admin avatar"
            className="admin-avatar"
          />
          <h2 className="admin-name">{admin?.fullName || "Admin User"}</h2>
          <p className="admin-role">{admin?.role || "System Administrator"}</p>

          <p className="admin-status online">● Online</p>

          <div className="admin-meta">
            <p><strong>Email:</strong> {admin?.email || "N/A"}</p>
            <p><strong>Signed in:</strong> Today</p>
            {/* <p><strong>Shift time:</strong> 00h 00m</p> */}
          </div>
        </div>

        {/* Pending Verification List */}
        <div className="pending-card">
          <h3>Pending Account Verifications</h3>

          <table className="pending-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan="5">Loading...</td></tr>
              ) : pendingUsers.length === 0 ? (
                <tr><td colSpan="5">No pending verifications</td></tr>
              ) : (
                pendingUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td>{u.registerDate || "N/A"}</td>
                    <td>
                      <button className="view-btn" onClick={() => setSelectedUser(u)}>View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Snapshot */}
        <div className="snapshot-card">
          <h3>Today's Snapshot</h3>
          <div className="snapshot-number">{verifiedCount}</div>
          <p className="snapshot-label">Verified Accounts</p>
        </div>
      </div>

      {/* Popup Modal */}
      {selectedUser && (
  <div className="modal-overlay">
    <div className="modal-box">

      <h3>Verify User</h3>

      <p><strong>Name:</strong> {selectedUser.fullName}</p>
      <p><strong>Email:</strong> {selectedUser.email}</p>
      <p><strong>Location:</strong> {selectedUser.location}</p>
      <p><strong>Age:</strong> {selectedUser.age}</p>
      <p><strong>Gender:</strong> {selectedUser.gender}</p>
      {/* <p><strong>Government ID:</strong> {selectedUser.governmentID}</p> */}
      <hr style={{ margin: "15px 0" }} />

      
      <h4>Submitted Documents</h4>
<div className="documents-container">
  {documents.length === 0 ? (
    <p>No documents uploaded</p>
  ) : (
    documents.map((doc) => (
      <div
        key={doc.id}
        className={`document-card ${
          expandedDoc === doc.id ? "expanded" : ""
        }`}
        onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
      >
        <img src={doc.image} alt={doc.title} />
        <p>{doc.title}</p>
      </div>
    ))
  )}
</div>

      <div className="modal-actions">
        <button
          className="approve-btn"
          onClick={() => handleDecision(selectedUser.id, "approve")}
        >
          Approve
        </button>

        <button
          className="decline-btn"
          onClick={() => handleDecision(selectedUser.id, "decline")}
        >
          Decline
        </button>

        <button
          className="close-btn"
          onClick={() => setSelectedUser(null)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}