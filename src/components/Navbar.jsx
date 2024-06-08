import { Link, useLocation } from "react-router-dom";
import '../components.css'
import { useState } from "react";
// import { Logo as MySvgIcon } from 'prevue.svg';


export const Navbar = () => {
    const location = useLocation();
    const [isActive, setIsActive] = useState(false)
  
    // Array of paths where Navbar should be visible
    const visiblePaths = ['/', '/rentals', '/restaurants', '/activities'];

    // Check if the current path is in the visiblePaths array
    const isVisible = visiblePaths.includes(location.pathname);

    // If the current path is not in visiblePaths, return null to hide Navbar
    if (!isVisible) {
        return null;
    }

    return (
        <nav  style={{left: isActive ? '0' : '5%'}}>
            <Link to='/'>
                <img src="prevue.png" className="logo" alt="" />
            </Link>

            <img className="hamburger-menu" src="hamburger.svg" alt=""  onClick={() => setIsActive(true)}/>
            
            <div className={`nav-menu ${isActive ? 'active' : ''}`}>
                <div className="responsive-nav-x">
                    <img src="prevue.svg" alt="" className="logo-black" />
                    <img src="X.svg" alt="" className="X" onClick={() => setIsActive(false)} />
                </div> 
                <ul style={{color: location.pathname === '/' &&  {isActive} ? 'black' : 'white'}} >
                    <li style={{color: location.pathname == '/' && 'var(--primary-color)'}}><Link to="/">Home</Link></li>
                    <li style={{color: location.pathname == '/rentals' && 'var(--primary-color)'}}><Link to="/rentals">Rentals</Link></li>
                    <li style={{color: location.pathname == '/restaurants' && 'var(--primary-color)'}}><Link to="/restaurants">Restaurants</Link></li>
                    <li style={{color: location.pathname == '/activities' && 'var(--primary-color)'}}><Link to="/activities">Activities</Link></li>
                </ul>
                <Link to='/login'> <button>Sign In</button> </Link>

            </div>    
            
                    
        </nav>
    );
} 