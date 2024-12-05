// Import React and necessary hooks
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Firebase imports
import { auth, db, storage } from '../firebaseConfig.jsx';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, query, where, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Global state and custom components
import { useGlobalState } from '../Contexts/GlobalStateContext.jsx';
import { PropertiesTab } from '../components/PropertiesTab.jsx';
import { SettingsTab } from '../components/SettingsTab.jsx';

// Styles
// import '../dashboard.css';

// Main Dashboard Component
export const Dashboard = () => {
  // Destructure state and setters from global context
  const { userData, setUserData, loading, setLoading, userImageUrl } = useGlobalState();

  // State variables
  const [documentID, setDocumentID] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const [dropdownActive, setDropdownActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState('account'); // Default tab is 'account'

  // Firebase reference
  const userRef = collection(db, 'users');
  const navigate = useNavigate();

  // Reference for user profile image in Firebase Storage
  const imageRef = ref(storage, `/userImages/${auth?.currentUser?.uid}/image-1`);

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login'); // Redirect to Login after logout
  };

  // Handle tab change
  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  // Fetch active user data on component mount
  useEffect(() => {
    const getActiveUser = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          // User is not signed in, redirect to login
          navigate('/login');
          setUserData(null);
          setLoading(false);
        } else {
          // Query the user data from Firestore
          const q = query(userRef, where('uid', '==', user.uid));
          try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              const documentId = doc.id;
              setDocumentID(documentId); // Store document ID
              setUserData(doc.data());  // Update user data in global state
            });
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      });

      return () => unsubscribe(); // Cleanup subscription
    };

    getActiveUser();
  }, [navigate, setUserData, setLoading]);

  return (
    <div className="dashboard">
      {/* Sidebar Navigation */}
      <div className="dashboard-nav-section">
        <div className="dashboard-navbar">
          {/* Navigation Items */}
          <div className="nav-items">
            <div
              className={`dashboard-navbar-item ${selectedTab === 'account' ? 'active' : ''}`}
              onClick={() => handleTabChange('account')}
            >
              <img src="/dashboard.svg" alt="" className="prof-img" />
              <span className="nav-item-text">Dashboard</span>
            </div>
            <div
              className={`dashboard-navbar-item ${selectedTab === 'reservations' ? 'active' : ''}`}
              onClick={() => handleTabChange('reservations')}
            >
              <img src="/stack.svg" alt="" className="res-img" />
              <span className="nav-item-text">Reservations</span>
            </div>
            <div
              className={`dashboard-navbar-item ${selectedTab === 'properties' ? 'active' : ''}`}
              onClick={() => handleTabChange('properties')}
            >
              <img src="/prop.svg" alt="" className="res-img" />
              <span className="nav-item-text">Properties</span>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="dashboard-nav-bottom">
            {/* Settings */}
            <div
              className={`dashboard-navbar-item ${selectedTab === 'settings' ? 'active' : ''}`}
              onClick={() => handleTabChange('settings')}
            >
              <img src="/gears.svg" alt="" className="prof-img" /> Settings
            </div>
            <div className="bb"></div>
            {/* Logout */}
            <div className="logout" onClick={handleLogout}>
              <div style={{ width: '80%', boxSizing: 'border-box' }}>
                <small style={{ display: 'block', fontWeight: '600', cursor: 'pointer' }}>Logout</small>
                <small style={{ minWidth: 'fit-content' }}>{userData?.email}</small>
              </div>
              <img src="/logout.svg" alt="" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="dashboard-body-section">
        {/* Top Bar */}
        <div className="top-row" style={{ display: selectedTab === 'settings' && 'none' }}>
          <div className="search-bar-column">
            <img className="search-icon" src="/search.svg" alt="" />
            <input className="search-input" type="text" placeholder="Search" />
          </div>
          <div className="account-column">
            <div className="notification">
              <img src="/bell.svg" alt="" style={{ width: '17px' }} />
            </div>
            <div className="user-dropdown">
              <img
                src={userImageUrl}
                alt=""
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <div className="info">
                <small className="dash-name">{userData?.fullName.split(' ')[0]}</small>
                <small className="dash-name">{userData?.fullName.split(' ')[1]}</small>
              </div>
              <img
                src="/down-arrow.svg"
                alt=""
                style={{ width: '17px' }}
                onClick={() => setDropdownActive(!dropdownActive)}
              />
              {/* Dropdown Menu */}
              <div className={`dropdown-content ${dropdownActive && 'active'}`}>
                <span onClick={() => setSelectedTab('settings')}>My Profile</span>
                <hr style={{ background: '#f2f4f7', height: '2px', border: 'none' }} />
                <Link to={'/login'} style={{ color: 'var(--primary-color)' }}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Render content based on selected tab */}
        {selectedTab === 'account' && <AccountContent userData={userData} />}
        {selectedTab === 'reservations' && <PropertyContent />}
        {selectedTab === 'properties' && <PropertiesTab userData={userData} />}
        {selectedTab === 'settings' && <SettingsTab userData={userData} documentID={documentID} />}
      </div>
    </div>
  );
};

// Account Tab Content
function AccountContent({ userData }) {
  return (
    <div className="account-tab">
      <div className="title">
        <h2>Welcome back, {userData?.fullName}</h2>
        <p>Track, manage, and forecast your customer and orders data</p>
      </div>
      {/* Statistics */}
      <div className="data-row">
        {/* Reservation Data */}
        <Card title="Total Reservations" value="12" change="40%" />
        {/* Restaurant Data */}
        <Card title="Total Restaurants" value="8" change="40%" />
        {/* Entry Data */}
        <Card title="Total Entries" value="20" change="20%" />
      </div>
    </div>
  );
}

// Generic Card Component
function Card({ title, value, change }) {
  return (
    <div className="card">
      <div className="row1">
        <h4>{title}</h4>
        <img src="/Dropdown.svg" alt="" />
      </div>
      <div className="row-2">
        <p className="big-number">{value}</p>
      </div>
      <div className="row-3">
        <div className="change-rate">
          <img src="/green-arrow-up.svg" alt="" />
          <p>
            <span style={{ color: 'green' }}>{change}</span> vs last month
          </p>
        </div>
      </div>
    </div>
  );
}

// Placeholder for Property Content
function PropertyContent() {
  return <div>View Reservations</div>;
}

export default Dashboard;