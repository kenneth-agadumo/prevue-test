import React, {useState} from 'react'
import MailBox from '../mailbox.json'
import Lottie from "lottie-react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const NewsLetterModal = ({ isVisible, onClose }) => {
    
    if (!isVisible) return null;

    const [email, setEmail] = useState({})
    
    const [phone, setPhone] = useState('')


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
    


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
    <div className="bg-white rounded-lg shadow-lg  pb-6 w-10/12 md:w-96  ">
    <div className='flex justify-center rounded-lg  bg-primaryshade'>
     <Lottie style={{ width: "220px" }} animationData={MailBox} loop={false} />
    </div>
    <div className='p-6'>
        <h2 className="text-2xl font-bold mb-4">Join Our Newsletter!</h2>
        <p className="text-gray-700 mb-6">
            Be the first to get access to the newest offers, deals, locations and much more...
        </p>
        <input type="text" className='h-10 w-full bg-amber-50 p-2 mb-6 rounded-md' name="email" placeholder="Yourown@gmail.com" id="" onChange={(e) => handleChange(e)}  />
        <br />
     
        <button
            onClick={collectMail}
            className="bg-primary w-full text-white mx-auto mb-2 px-4 py-2 rounded-lg hover:bg-opacity-90 transition "
        >
            Subscribe
        </button>
        <button
            className=" w-full text-primary mx-auto px-4 py-2 rounded-lg hover:bg-primaryshade transition "
            onClick={onClose}
        >
            No, Thanks
        </button>
    </div>
     
    </div>
  </div>
  )
}

export default NewsLetterModal



