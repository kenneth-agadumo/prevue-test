import React from 'react';
import {  signOut, onAuthStateChanged} from 'firebase/auth';
import {  useNavigate } from 'react-router-dom';
import {auth, db} from '../firebaseConfig.jsx'
import { doc, getDoc, getDocs, query, where, collection } from 'firebase/firestore';
import { SegmentedControl, Table } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import Modal from '../components/RestaurantModal.jsx';
import { PropertiesTab } from '../components/PropertiesTab.jsx';
import '../layout.css'

export const Dashboard = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userRef = collection(db, 'users')

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login'); // Redirect to Login after logout
  };

  useEffect(() => {
    const getActiveUser = async () =>{
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            
            const q = query(userRef, where("uid", "==", user.uid));
            
            try {
                const querySnapshot = await getDocs(q);
                
                querySnapshot.forEach((doc) => {
                  
                    const user = doc.data(); // Access document data using the data() method
                   
                    setUserData(user);
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Handle error (e.g., show an error message to the user)
            }
        } else {
            // User is not signed in, handle accordingly
            setUserData(null); // Clear user data when user signs out
            setLoading(false);
        }
    });
            
        return () => unsubscribe();
    }


    getActiveUser()
    
  }, []);
   

  const [selectedTab, setSelectedTab] = useState('account');

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };
 
  

  return (
    <div className='dashboard'>
      
      
      <div className="dashboard-nav-section">
       
        <div className="dashboard-navbar ">

          <div className="nav-items">
            <div   className={`dashboard-navbar-item ${selectedTab === 'account' ? 'active' : ''}`}value="inbox" onClick={() => handleTabChange('account')} >
              <img src="dashboard.svg" alt="" className='prof-img'/> <span className="nav-item-text">Dashboard</span> 
            </div>
            <div className={`dashboard-navbar-item ${selectedTab === 'reservations' ? 'active' : ''}`} value="drafts" onClick={() => handleTabChange('reservations')} >
            <img src="stack.svg" alt="" className='res-img'/> <span className="nav-item-text">Reservations</span> 
            </div>
            <div className={`dashboard-navbar-item ${selectedTab === 'properties' ? 'active' : ''}`} value="sent" onClick={() => handleTabChange('properties')} >
            <img src="prop.svg" alt="" className='res-img' />  <span className="nav-item-text">Properties</span> 
            </div>
          </div>

          <div className="dashboard-nav-bottom">
            <div className={`dashboard-navbar-item ${selectedTab === 'settings' ? 'active' : ''}`} value="settings" onClick={() => handleTabChange('settings')} >
            <img src="gears.svg" alt=""  className='prof-img'/> Settings
            </div>
            <div className="bb"></div>
            <div className="logout " >
              
              <div style={{width:'80%', boxSizing:'border-box'}} onClick={handleLogout}>
                <small style={{display:'block', fontWeight:'600', cursor:'pointer'}}>Logout</small>
                <small style={{minWidth:'fit-content'}}> {userData?.email}</small>
              </div>
              
              <img src="logout.svg" alt=""  style={{cursor:'pointer'}}/>
            </div>
         </div>
        </div>

      </div>

      <div className="dashboard-body-section">
        <div className="top-row">
          <div className="search-bar-column">
            <img className='search-icon' src="search.svg" alt="" />
            <input className='search-input' type="text"placeholder='Search' />
          </div>
          <div className="account-column">
            <div className="notification">
              <img src="bell.svg" alt="" style={{width:'17px'}}/>
            </div>
            <div className="user-dropdown">
              <img src="Avatar.svg" alt="" />
              <div className="info">
                <small className='name'>{userData?.fullName.split(' ')[0]}</small>
                <small className='name'>{userData?.fullName.split(' ')[1]}</small>
              </div>
              <img src="down-arrow.svg" alt=""  style={{width:'17px'}}/>
              
            </div>
          </div>
        </div>

        {/* Render content based on selected tab */}
        {selectedTab === 'account' && <AccountContent loading = {loading} userData={userData} />}
        {selectedTab === 'reservations' && <PropertyContent />}
        {selectedTab === 'properties' && <PropertiesTab userData ={userData}  />} 
        {selectedTab === 'settings' && <SettingContent userData={userData} />} 
      </div>
    </div>
  );
};


// Sample content components
function AccountContent(props) {
  // const data = props.userData
  // const email = data.email
  return (
    <div className='account-tab'>
      <div className="title">
        <h2 style={{fontWeight:'500'}}>Welcome back, {props.userData?.fullName.charAt(0).toUpperCase() + props.userData?.fullName.slice(1)}</h2>
        <p>Track, mangage and forecast your customer and orders data</p>
      </div>
      <div className="data-row">

        <div className="reservation-data card">

          <div className='row1'>
            <h4 style={{fontWeight:'500'}}>Total Reservations</h4>
            <img src="Dropdown.svg" alt="" />
          </div>

          <div className='row-2'>
            <p className='big-number'>12</p>
          </div>

          <div className='row-3'>
            <div className="change-rate">
              <img src="green-arrow-up.svg" alt="" /><p> <span style={{color:'green'}}>40%</span> vs last month</p>
            </div>
          </div>

        </div>


        <div className="restaurant-data card">

          <div className='row1'>
            <h4 style={{fontWeight:'500'}}>Total Restaurants</h4>
            <img src="Dropdown.svg" alt="" />
          </div>

          <div className='row-2'>
            <p className='big-number'>8</p>
          </div>

          <div className='row-3'>
            <div className="change-rate">
              <img src="green-arrow-up.svg" alt="" /><p> <span style={{color:'green'}}>40%</span> vs last month</p>
            </div>
          </div>

        </div>

        <div className="entry-data card">

        <div className='row1'>
            <h4 style={{fontWeight:'500'}}>Total Entries</h4>
            <img src="Dropdown.svg" alt="" />
          </div>

          <div className='row-2'>
            <p className='big-number'>20</p>
          </div>

          <div className='row-3'>
            <div className="change-rate">
              <img src="green-arrow-up.svg" alt="" /><p> <span style={{color:'green'}}>20%</span> vs last month</p>
            </div>
          </div>

        </div>

      </div>
    </div>
    
  )
}

function RestaurantContent() {
 
}

function PropertyContent() {
  return <div>View Reservations</div>;
}
function SettingContent(props) {
  return (
    <div className='card' style={{}}>
      <p>Full Name: {props.userData?.fullName}</p>
      <p>Phone Number: {props.userData?.phoneNumber}</p>
      <p>Email: {props.userData?.email}</p>

    </div>
  )
}

export default Dashboard;