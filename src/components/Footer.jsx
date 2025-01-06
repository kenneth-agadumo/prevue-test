import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FiLinkedin } from "react-icons/fi";
import { FiFacebook } from "react-icons/fi";

const Footer = () => {
    return(
        <div className="footer ">
                <div className="footer-row-1">
                    <div className="row1-left">
                        <p className="newsletter-header">Stay Updated</p>
                        <p className="newsletter-text">Subscribe to our newsletter for the latest location previews and special offers</p>
                        <div className="newsletter">
                            <input type="email" name="n-email" placeholder="Yourown@gmail.com" id="" style={{ color: '#fdfdfd' }} />
                            <button style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'6px'}}>Go <img src="forward.svg" alt="" /></button>
                        </div>
                    </div>
                    <div className="row1-right">
                        <ul>
                            <p>Quick Links</p>
                           <Link to="/"><a href=""> <li>Home</li></a></Link>
                           <Link to="/restaurants"><a href=""><li>Restaurants</li></a></Link>
                           <Link to="/rentals"><a href=""><li>Properties</li></a></Link>
                           <Link to="/activities"><a href=""><li>Activities</li></a></Link>
                            
                            
                        </ul>
                        <ul>
                            <p>Socials</p>
                            <Link><li><FaXTwitter /></li></Link>
                            <Link><li><FaInstagram /></li></Link>
                            <Link><li><FiLinkedin /></li></Link>
                            <Link><li><FiFacebook /></li></Link>
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