import React, { useState } from 'react';
import { db, auth, storage } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

const Footer = () => {
    const [email, setEmail] = useState({})


    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target
        setEmail({...email, [name]: value})
        console.log(email)
    }

    const collectMail = async () => {
        

        try {
      
        const docRef = await addDoc(collection(db, 'newsletter'), email);
        console.log('email added successfully')

        } catch (error) {
        console.log(error);
        }
    }
    
    return(
        <div className="footer ">
                <div className="footer-row-1">
                    <div className="row1-left">
                        <p className="newsletter-header">Stay Updated</p>
                        <p className="newsletter-text">Subscribe to our newsletter for the latest location previews and special offers</p>
                        <div className="newsletter">
                            <input type="email" name="email" placeholder="Yourown@gmail.com" id="" onChange={(e) => handleChange(e)} style={{ color: '#fdfdfd' }} />
                            <button style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'6px'}} onClick={collectMail}>Go <img src="forward.svg" alt="" /></button>
                        </div>
                    </div>
                    <div className="row1-right">
                        <ul>
                            <p>Quick Links</p>
                            <li>Home</li>
                            <li>Restaurants</li>
                            <li>Properties</li>
                            <li>Activities</li>
                        </ul>
                        <ul>
                            <p>Socials</p>
                            <li>X(Twitter)</li>
                            <li>Instagram</li>
                            <li>LinkedIn</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-row-2">
                    <div className="column">
                        <p>info@prevue.com</p>
                        <p>+234 81234567890</p>
                    </div>
                    <p> ©2023 legal</p>
                </div>
                <div className="footer-row-3">
                    <img src="/prevue.png" alt="" />
                </div>
            </div>
    )
}
export default Footer;