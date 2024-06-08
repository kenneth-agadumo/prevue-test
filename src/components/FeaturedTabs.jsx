import { useState } from "react";
import '../layout.css'
import { Dropdown } from "./Dropdown";
import { RentalCard, RestaurantCard } from "./Card";

export const FeaturedTabs = () => {
    const [selectedTab, setSelectedTab] = useState('restaurants');
    
    const handleTabChange = (newValue) => {
      setSelectedTab(newValue);
    };

    console.log(selectedTab)

    return(
        <div className="featured-tabs">
        <div className="tab-row">
            <div className={`tab-item  ${selectedTab === 'rentals' ? 'active' : ''}`} onClick={() => handleTabChange('rentals')} >Rentals</div>
            <div className={`tab-item  ${selectedTab === 'restaurants' ? 'active' : ''}`} onClick={() => handleTabChange('restaurants')}>Restaurants</div>
            <div className={`tab-item  ${selectedTab === 'activities' ? 'active' : ''}`} onClick={() => handleTabChange('activities')}>Activities</div>
        </div>

        {selectedTab === 'rentals' &&  <RentalSection/> }
        {selectedTab === 'restaurants' && <RestaurantSection/> }
        {selectedTab === 'activities' && <ActivitiesSection/> }
           
        
    </div>
    )
}

export const RentalSection = () => {
    return(
        <div className="tab-content-container">
            
            <div className="tab-content">
            <p className="tab-content-text  ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Suspendisse varius enim in eros elementum tristique. 
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla,
            ut commodo diam libero vitae erat.
            </p>
            <div className="content-row">
                <Dropdown  itemNumber={3} itemsArray={['All Types', 'Type 1', 'Type 2']} />
                <div className="content-item">
                    <RentalCard />
                </div>
            </div>
            </div>
            
        </div>
    )
    
}
export const RestaurantSection = () => {
    return(
        <div className="tab-content-container">
            
            <div className="tab-content">
            <p className="tab-content-text  ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Suspendisse varius enim in eros elementum tristique. 
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla,
            ut commodo diam libero vitae erat.
            </p>
            <div className="content-row">
                <Dropdown  itemNumber={3} itemsArray={['All Types', 'Type 1', 'Type 2']} />
                <div className="content-item">
                    <RestaurantCard name={'Hard Rock Cafe'} address={'10 Admiralty Way, Lekki, Lagos'}  image={'hard-rock.png'} width={'43.3%'} />
                    <RestaurantCard name={'Crust Cafe'} address={'10 Admiralty Way, Lekki, Lagos'}  image={'crust.png'} width={'43.3%'} />
                    <RestaurantCard name={'Pause Cafe'} address={'10 Admiralty Way, Lekki, Lagos'}  image={'pause.png'} width={'43.3%'} />
                </div>
            </div>
            </div>
            
        </div>
    )

}
export const ActivitiesSection = () => {
    return(
        <div className="tab-content-container">
            
        <div className="tab-content">
        <p className="tab-content-text  ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Suspendisse varius enim in eros elementum tristique. 
        Duis cursus, mi quis viverra ornare, eros dolor interdum nulla,
        ut commodo diam libero vitae erat.
        </p>
        <div className="content-row">
            <Dropdown  itemNumber={3} itemsArray={['All Types', 'Type 1', 'Type 2']} />
            <div className="content-item">
                A content goes here
            </div>
        </div>
        </div>
        
    </div>
    )

}