import { useState } from "react";
import "../layout.css";
import { Dropdown } from "./Dropdown";
import { RentalCard, RestaurantCard } from "./Card";
import Lottie from "lottie-react";
import ComingSoon from "../coming-soon.json";

export const FeaturedTabs = () => {
  const [selectedTab, setSelectedTab] = useState("restaurants");

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  

  console.log(selectedTab);

  return (
    <div className="featured-tabs">
      <div className="tab-row">
        <div
          className={`tab-item  ${selectedTab === "rentals" ? "active" : ""}`}
          onClick={() => handleTabChange("rentals")}
        >
          Rentals
        </div>
        <div
          className={`tab-item  ${
            selectedTab === "restaurants" ? "active" : ""
          }`}
          onClick={() => handleTabChange("restaurants")}
        >
          Restaurants
        </div>
        <div
          className={`tab-item  ${
            selectedTab === "activities" ? "active" : ""
          }`}
          onClick={() => handleTabChange("activities")}
        >
          Activities
        </div>
      </div>

      {selectedTab === "rentals" && <RentalSection />}
      {selectedTab === "restaurants" && <RestaurantSection />}
      {selectedTab === "activities" && <ActivitiesSection />}
    </div>
  );
};

export const RentalSection = () => {
  return (
    <div className="tab-content-container">
      <div className="tab-content">
        <p className="tab-content-text  ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
        <div>
          <div className="">
            <Dropdown
              itemNumber={3}
              placeholder={"All Types"}
              itemsArray={["Type 1", "Type 2"]}
              border={"none"}
              isSearchable={false}
            />
          </div>

          <div className="content-item grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <RentalCard
              name={"Crust Cafe"}
              address={"10, Admiralty Way, Lekki, Lagos"}
              price={"1,500,000/year"}
              image={"/crust.png"}
              width={"43.3%"}
              note={"prevue"}
            />
            <RentalCard
              address={"10, Admiralty Way, Lekki, Lagos"}
              price={"1,500,000/year"}
              image={"/hard-rock.png"}
              width={"33%"}
              note={"prevue"}
              />
           
            <RentalCard
              name={"Pause Cafe"}
              address={"10, Admiralty Way, Lekki, Lagos"}
              price={"1,500,000/year"}
              image={"/pause.png"}
              width={"43.3%"}
              note={"prevue"}
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
export const RestaurantSection = () => {
  return (
    <div className="tab-content-container">
      <div className="tab-content">
        <p className="tab-content-text  ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
        <div>
          <div className="">
            <Dropdown
              itemNumber={3}
              placeholder={"All Types"}
              itemsArray={["Type 1", "Type 2"]}
              border={"none"}
              isSearchable={false}
            />
          </div>

          <div className="content-item grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            <RestaurantCard
              name={"Hard Rock Cafe"}
              address={"10 Admiralty Way, Lekki, Lagos"}
              image={"/hard-rock.png"}
              width={"43.3%"}
              note={"prevue"}
            />
            <RestaurantCard
              name={"Crust Cafe"}
              address={"10 Admiralty Way, Lekki, Lagos"}
              image={"/crust.png"}
              width={"43.3%"}
              note={"prevue"}
            />
            <RestaurantCard
              name={"Pause Cafe"}
              address={"10 Admiralty Way, Lekki, Lagos"}
              image={"/pause.png"}
              width={"43.3%"}
              note={"prevue"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export const ActivitiesSection = () => {
  return (
    <div className="tab-content-container">
      <div className="tab-content">
        <p className="tab-content-text  ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
        <div className="content-row">
          <Dropdown
            itemNumber={3}
            placeholder={"All Types"}
            itemsArray={["Type 1", "Type 2"]}
            border={"none"}
            isSearchable={false}
          />
          <div className="content-item">
            <Lottie style={{ width: "250px" }} animationData={ComingSoon} />
          </div>
        </div>
      </div>
    </div>
  );
};
