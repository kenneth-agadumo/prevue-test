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
import { ReservationsTab } from '../components/ReservationsTab.jsx';
import { SettingsTab } from '../components/SettingsTab.jsx';
import { Overview, Properties, Reservation, Settings } from '../components/DashboardIcons.jsx';
import { PropertiesTab } from '../components/PropertiesTab.jsx';
import AccountsTab from '../components/AccountsTab.jsx';

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
    <div className=" bg-dashboard_grey flex flex-col" style={{height:'100vh'}}>
      {/* Dashboard Header */}
         <header className=" col-span-12 flex justify-between items-center py-7 pl-5 pr-9 h-2 ">
          <div>
            <Link to=""><img src="/prevue-orange.svg" alt="" /></Link>
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
        </header>

      <div className='flex flex-row overflow-auto gap-2 h-full'>
           {/* Sidebar Navigation */}
          <div className="bg-white basis-1/4 h-full p-3">
            <div className=" bg-white h-full flex flex-col justify-between py-4">
              {/* Navigation Items */}
              <div className=" flex flex-col gap-1">
                <div
                  className={`px-4 py-3 flex gap-2  rounded  hover:bg-primarylight cursor-pointer ${selectedTab === 'account' && 'bg-primarylight'}`}
                  onClick={() => handleTabChange('account')}
                >
                  <Overview color = {selectedTab === 'account' ? '#E99D43' : '#3A3A39'}/>
                  <span className= {`hidden sm:block text-gray-600 font-medium  ${selectedTab === 'account' && 'text-primary'}`}>Overview</span>
                </div>

                <div
                  className={`px-4 py-3 flex gap-2  rounded  hover:bg-primarylight cursor-pointer ${selectedTab === 'properties' && 'bg-primarylight'}`}
                  onClick={() => handleTabChange('properties')}
                >
                  <Properties color = {selectedTab === 'properties' ? '#E99D43' : '#3A3A39'}/>
                  <span className= {`hidden sm:block text-gray-600 font-medium  ${selectedTab === 'properties' && 'text-primary'}`}>Properties</span>
                </div>
                <div
                  className={`px-4 py-3 flex gap-2  rounded  hover:bg-primarylight cursor-pointer ${selectedTab === 'reservations' && 'bg-primarylight'}`}
                  onClick={() => handleTabChange('reservations')}
                >
                  <Reservation color = {selectedTab === 'reservations' ? '#E99D43' : '#3A3A39'} />
                  <span className= {`hidden sm:block text-gray-600 font-medium  ${selectedTab === 'reservations' && 'text-primary'}`}>Reservations</span>
                </div>
               
              </div>

              {/* Bottom Section */}
              <div className="dashboard-nav-bottom">
                {/* Settings */}
                <div
                  className={`px-4 py-3 flex gap-2  rounded  hover:bg-primarylight cursor-pointer ${selectedTab === 'settings' && 'bg-primarylight'}`}
                  onClick={() => handleTabChange('settings')}
                >
                 <Settings color = {selectedTab === 'settings' ? '#E99D43' : '#3A3A39'} /> 
                  <span className= {`hidden sm:block text-gray-600 font-medium  ${selectedTab === 'settings' && 'text-primary'}`}> Settings</span>
                </div>
                <div className="bb w-full"></div>
                {/* Logout */}
                <div className="px-4 py-5 flex rounded hover:bg-primarylight cursor-pointer" onClick={handleLogout}>
                  <div style={{ width: '80%', boxSizing: 'border-box' }}>
                    <p className='hidden sm:block text-sm' style={{ display: 'block', fontWeight: '600', cursor: 'pointer' }}>Logout</p>
                    <p className='hidden sm:block text-sm' style={{ minWidth: 'fit-content' }}>{userData?.email}</p>
                  </div>
                  <img src="/logout.svg" alt="" style={{ cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="overflow-auto  h-full bg-white basis-3/4">
          <h1></h1>

            {/* Render content based on selected tab */}
            {selectedTab === 'account' && <AccountsTab userData={userData} />}
            {selectedTab === 'properties' &&  < PropertiesTab userData={userData} />}
            {selectedTab === 'reservations' &&  <ReservationsTab userData={userData} />}
            {selectedTab === 'settings' && <SettingsTab userData={userData} documentID={documentID} />}
          </div>
              
      </div>
     
    </div>
  );
};



// Placeholder for Property Content
function PropertyContent() {
  return <div><PropertiesContent/></div>;
}

export default Dashboard;