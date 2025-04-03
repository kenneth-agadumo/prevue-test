
import { Link } from "react-router-dom";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FiLinkedin, FiFacebook } from "react-icons/fi";
import { PiTiktokLogo } from "react-icons/pi";
import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import NewsLetterModal from "./NewsLetterModal"; // Import the modal

const Footer = () => {
  const [email, setEmail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
  };

  const collectMail = async () => {
    try {
      await addDoc(collection(db, "newsletter"), email);
      console.log("Email added successfully");
      setIsModalOpen(true); // Open the modal after submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="footer">
        <div className="footer-row-1">
          <div className="row1-left">
            <p className="newsletter-header">Stay Updated</p>
            <p className="newsletter-text">
              Subscribe to our newsletter for the latest location previews and special offers
            </p>
            <div className="newsletter">
              <input
                type="email"
                name="email"
                placeholder="Yourown@gmail.com"
                onChange={handleChange}
                style={{ color: "#fdfdfd" }}
              />
              <button
                style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px" }}
                onClick={collectMail}
              >
                Go <img src="forward.svg" alt="" />
              </button>
            </div>
          </div>
          <div className="row1-right">
            <ul>
              <p>Quick Links</p>
              <Link to="/"><li>Home</li></Link>
              <Link to="/restaurants"><li>Restaurants</li></Link>
              <Link to="/rentals"><li>Properties</li></Link>
              <Link to="/activities"><li>Activities</li></Link>
            </ul>
            <ul>
              <p>Socials</p>
              <div className="flex flex-col gap-1">
                <Link><li><FaXTwitter /></li></Link>
                <Link><li><FaInstagram /></li></Link>
                <Link><li><FiLinkedin /></li></Link>
                <Link><li><FiFacebook /></li></Link>
                <Link><li><PiTiktokLogo /></li></Link>
              </div>
            </ul>
          </div>
        </div>
        <div className="footer-row-2">
          <div className="column">
            <p>info@prevue.com</p>
            <p>+234 81234567890</p>
          </div>
          <p>©2023 legal</p>
        </div>
        <div className="footer-row-3">
          <img src="/prevue.png" alt="" />
        </div>
      </div>

      {/* Render the modal if isModalOpen is true */}
      <NewsLetterModal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Footer;
