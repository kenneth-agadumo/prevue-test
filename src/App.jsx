import React, { useEffect, useState, createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PasswordReset from "./pages/PasswordReset";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Activities } from "./pages/Activities";
import { Restaurants } from "./pages/Restaurants";
import { Rentals } from "./pages/Rentals";
import EmailVerification from "./pages/EmailVerification";
import { RestaurantPage } from "./pages/RestaurantPage";
import { RentalPage } from "./pages/RentalPage";
import Loading from "./house-loading.json";
import "./App.css";
import Lottie from "lottie-react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "react-datepicker/dist/react-datepicker.css";
import "./components.css";
import ScrollToTop from "./components/ScrollToTop";
import SearchResultsPage from "./pages/SearchResultsPage";

const imageSources = ["/hero-bg.png", "/prevue.svg", "/prevue.png"];

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Prevue - Virtual Tours & Bookings";
    const preloadImages = async () => {
      const cacheImages = (srcArray) => {
        return Promise.all(
          srcArray.map((src) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = (error) => {
                console.error(`Failed to load image: ${src}`, error);
                resolve(); // Resolve anyway to not block the Promise.all
              };
            });
          })
        );
      };

      try {
        await cacheImages(imageSources);
        setIsLoading(false);
      } catch (error) {
        console.error("Error preloading images:", error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  if (isLoading) {
    return (
      <>
        <div
          className="loading-container"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Lottie style={{ width: "300px" }} animationData={Loading} />
        </div>
      </>
    );
  }

  return (
    <div className="root " id="root">
      <Router>
        <ScrollToTop />
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-successful" element={<PasswordReset />} />
            <Route path="/verify-email" element={<EmailVerification />} />

            <Route
              path="/restaurants/:restaurantId"
              element={<RestaurantPage />}
            />
            <Route path="/rentals/:shortletId" element={<RentalPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
