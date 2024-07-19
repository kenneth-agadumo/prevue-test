import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {collection, getDocs, doc, onSnapshot,deleteDoc } from 'firebase/firestore'
import RestaurantModal from './RestaurantModal.jsx';
import RentalModal from './RentalModal.jsx';
import { SegmentedControl, Table } from '@radix-ui/themes';
import { useGlobalState } from "../Contexts/GlobalStateContext.jsx";

export const PropertiesTab = (props) =>{
    
    const [selectedTab, setSelectedTab] = useState('restaurants');
    const handleTabChange = (newValue) => {
      setSelectedTab(newValue);
    };
   

    
   
    return (
    <div>
      <div className="tab-bar">

      <div className={`properties-tab-item ${selectedTab === 'rentals' ? 'active' : ''}`} value="" onClick={() => handleTabChange('rentals')} >
        <span> Rentals </span>
      </div>

      <div   className={`properties-tab-item ${selectedTab === 'restaurants' ? 'active' : ''}`}value="" onClick={() => handleTabChange('restaurants')} >
        <span> Restaurants </span>
      </div>

      
      </div>
            
      {selectedTab === 'restaurants' && <RestaurantDashboard/> }
      {selectedTab === 'rentals' &&  <RentalDashboard/> }


      
    </div>
  )
}



export const RentalDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const {rentals, setRentals} = useGlobalState()
    
  const rentalRef = collection(db, 'rentals')


  

  const deleteRental = async (id) =>{
    const rentalDoc = doc(db,'rentals', id)
    await deleteDoc(rentalDoc)
  }



  
  return(
    <div>
      <div className="dash-section restaurant-record " >
        <div className="top-row">
          <h3>Rentals Records</h3>
            <button className='add-button' onClick={{openModal}} ><img src="plus.svg" alt="" className='plus' />Add New</button>
          
          <RentalModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        
        <div className=" restaurant-list "> 
          
          <Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell> Description</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Location </Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Contact Number</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {rentals?.filter((doc) => doc.userId == auth?.currentUser?.uid ).map((rental, key) => (
            
            <Table.Row>
            <Table.RowHeaderCell>{rental?.rooms}</Table.RowHeaderCell>
            <Table.Cell>{rental?.address}</Table.Cell>
            <Table.Cell>{rental?.price}</Table.Cell>
            <Table.Cell>{rental?.phoneNumber}</Table.Cell>
            <Table.Cell>
            <button onClick={() =>  deleteRental(rental?.id)}>Delete</button>
            </Table.Cell>
          </Table.Row>

          ))}
    
  </Table.Body>
</Table.Root>




        </div>
        
      </div>
    </div>
  )
}

export const RestaurantDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {restaurants, setRestaurants} = useGlobalState()

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  
    
  const deleteRestaurant = async (id) =>{
    const restaurantDoc = doc(db,'restaurants', id)
    await deleteDoc(restaurantDoc)
  }

  return(
    <div>
      <div className="dash-section restaurant-record " >
        <div className="top-row">
          <h3>Restaurants Records</h3>
            <button className='add-button' onClick={openModal} ><img src="plus.svg" alt="" className='plus' />Add New</button>
          
          <RestaurantModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        
        <div className=" restaurant-list "> 
        <Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell> Name</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Location </Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Contact Number</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
  {restaurants?.filter((doc) => doc.userId == auth?.currentUser?.uid ).map((restaurant, key) => (
            
            // <div key={restaurant.id} className="card">
            //   <p>Name: {restaurant?.name}</p>
            //   <p> Address: {restaurant?.address}</p>
            //   <p>Contact Number: {restaurant?.contactNumber}</p>
            //   <button onClick={() =>  deleteRestaurant(restaurant.id)}>Delete</button>
            // </div>
            <Table.Row>
            <Table.RowHeaderCell>{restaurant?.name}</Table.RowHeaderCell>
            <Table.Cell>{restaurant?.address}</Table.Cell>
            <Table.Cell>{restaurant?.contactNumber}</Table.Cell>
            <Table.Cell>
            <button onClick={() =>  deleteRestaurant(restaurant?.id)}>Delete</button>
            </Table.Cell>
          </Table.Row>
        ))}
    
    
  </Table.Body>
</Table.Root>
        
        </div>
      </div>
    </div>
  )
}

