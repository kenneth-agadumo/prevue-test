import { Link, useLocation } from "react-router-dom";
import '../components.css'
import { useState, useEffect, useRef     } from "react";
// import { Logo as MySvgIcon } from 'prevue.svg';
import { Ham } from "../micro-components/Ham";
import LoginButton from "./RoleBasedLoginButton";

export const Navbar = () => {
    const location = useLocation();
    const [isActive, setIsActive] = useState(false)
    const navRef = useRef(null); // Ref to track the navbar element
  
    // Array of paths where Navbar should be visible
    const visiblePaths = ['/rentals', '/restaurants', '/activities', '/restaurants/', '/rentals/'];

  // Check if the current path matches any of the visible paths or a pattern like /restaurants/:restaurantId
  const isVisible = location.pathname === '/' || 
                    visiblePaths.includes(location.pathname) || 
                    /\/restaurants\/[^/]+$/.test(location.pathname) || 
                    /\/rentals\/[^/]+$/.test(location.pathname);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsActive(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    useEffect(() => {
        if (isActive) {
            setIsActive(false);
        }
    }, [location.pathname]); // Runs whenever the location changes



    // If the current path is not in visiblePaths, return null to hide Navbar
    if (!isVisible) {
        return null;
    }

    return (
        <nav
            ref={navRef}
            style={{left: isActive ? '0' : '5%'}} 
            className="z-50"
            >
            <Link to='/'>
                <img src={location.pathname === '/' &&  {isActive} ? '/prevue.png' : '/prevue.svg'} className="logo" alt="" />
            </Link>

            <div className="hamburger-menu"  onClick={() => setIsActive(true)}>
                <Ham  color={location.pathname === '/' ? 'white' : 'black'}  />
            </div>
                
            
            <div className={`nav-menu ${isActive ? 'active' : ''}`} >
                <div className="responsive-nav-x">
                    <img src="/prevue.svg" alt="" className="logo-black" />
                    <img src="/X.svg" alt="" className="X" onClick={() => setIsActive(false)} />
                </div> 
                <ul  style={{color: location.pathname === '/' &&  {isActive} ? 'white' : 'black', fontWeight:'500'}} >
                    <li style={{color: location.pathname == '/' && 'var(--primary-color)'}}><Link to="/">Home</Link></li>
                    <li style={{color: location.pathname == '/rentals' && 'var(--primary-color)'}}><Link to="/rentals">Shortlets</Link></li>
                    <li style={{color: location.pathname == '/restaurants' && 'var(--primary-color)'}}><Link to="/restaurants">Restaurants</Link></li>
                    <li style={{color: location.pathname == '/activities' && 'var(--primary-color)'}}><Link to="/activities">Activities</Link></li>
                </ul>
                <LoginButton />
            </div>    
            
                    
        </nav>
    );
} 

