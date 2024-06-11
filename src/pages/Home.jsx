
import '../layout.css'
import { FeaturedTabs } from '../components/FeaturedTabs'
import { Dropdown } from '../components/Dropdown'
import {EmbedScript} from '../components/VirtualTour'

export const Home = () => {
    return(
        <>
        <div className="hero-section">
            <div className="hero-container">
                <h1 className='hero-text'> Discover, Preview, and Explore Locations of Your Choice</h1>
                <div className="hero-search-bar">
                    <div className="dropdowns">
                        <div className="dropdown-1"><label style={{padding:'0 3px'}} htmlFor="">Category</label>
                            <Dropdown itemNumber={3} itemsArray={['Select Category', 'Rentals', 'Restaurants']} />
                        </div>
                        <div className="dropdown-2"><label style={{padding:'0 3px'}} htmlFor="">Sub-category</label>
                            <Dropdown itemNumber={3} itemsArray={['Select Sub-category', 'Rentals', 'Restaurants']}  />
                        </div>
                        <div className="dropdown-3"><label style={{padding:'0 3px'}} htmlFor="">Location</label>
                            <Dropdown itemNumber={3} itemsArray={['All Types', 'Type 1', 'Type 2']} />
                        </div>
                    </div>
                <div className="s-button">
                    <button className='hero-search-button'><img src="search-white.svg" alt="" /></button>
                </div>
                </div>
            </div>
            <div className="oval">
                
            </div> 
        </div>
        
        <div className="featured-section">
             
            <img src="double-down-arrow.svg" alt=""style={{width:'15px',marginBottom: '56px'}} />
                <h3 className='featured-header'>Browse Featured  Properties</h3>
            <FeaturedTabs />
        </div>
        <div className="about-oval" ></div>
        <div className="about-section-container">
            <div className="about-section">
                
                
                <div className="about-left">
                    <p>About Prevue</p>
                    <h3>
                    Headline with USP related to how your product or service works
                    </h3>
                    <button className='learn-more'>Learn More</button>
                </div>
                <div className="about-right">
                    <p>
                    At Prevue, we're your gateway to unforgettable experiences. Our mission is to simplify your quest for the perfect property, dining experience, or outing. 
                    Our platform offers immersive virtual reality tours, allowing you to step inside properties or explore dining destinations before you arrive.
                    We're committed to transparency in your planning, with cost estimates that cover every detail, from property costs to VAT and caution fees.
                    </p>
                    <button className='learn-more'>Learn More</button>
                </div>
            </div>  
                <img src="about-image.png" alt="" />
        </div>

        <div className="steps-section-container">
            <div className="steps-section">
                <div className="steps-left">
                    <img src="steps-image.png" alt="" />
                </div>
                <div className="steps-right">
                    <h3>
                        How it works <br /> in 3 simple steps
                    </h3>
                    <div className="steps">
                        <div className="step-1"> 
                            <span className='step-number'>01</span>
                            <p className='step-header'>Start by selecting a category</p>

                            <p className='step-text'>Whether it's a charming property, 
                                a delightful dining spot, or an exciting adventure,
                                 our platform has you covered</p>
                        </div>
                        <div className="step-1"> 
                            <span className='step-number'>02</span>
                            <p className='step-header'>Start by selecting a category</p>

                            <p className='step-text'>Whether it's a charming property, 
                                a delightful dining spot, or an exciting adventure,
                                 our platform has you covered</p>
                        </div>
                        <div className="step-1"> 
                            <span className='step-number'>03</span>
                            <p className='step-header'>Start by selecting a category</p>

                            <p className='step-text'>Whether it's a charming property, 
                                a delightful dining spot, or an exciting adventure,
                                 our platform has you covered</p>
                        </div>
                   
                    </div>
                </div>
            </div>
            
        </div>
        <div className="showcase-section">
            <div className="headline-intro">
                <div className="headline-left">
                    <p>Preview Locations</p>
                    <h3>Step into Your Favorite Locations with our panoramic virtual tours</h3>
                </div>

                <div className="headline-right">
                    <p> 
                        Our 360° location previews take you on a 
                        mesmerizing journey to explore properties, 
                        restaurants, and activities like never before.
                    </p>
                </div>
            </div>
            <div className="showcase">
            <iframe width="100%" height="640px" frameborder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowfullscreen scrolling="no" src="https://kuula.co/share/N28FK?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1&margin=26&alpha=0.60"></iframe>
            </div>
            <div className="showcase-slider">
                <div className="slider-bars">
                    <div className="slider-bar active"> </div>
                    <div className="slider-bar"></div>
                    <div className="slider-bar"></div>
                </div>
                <div className="buttons">
                    <button className="left-slider"> <img src="left-arrow.svg" alt="" style={{width:"7px"}} /></button>
                    <button className="right-slider"> <img src="right-arrow.svg" alt="" style={{width:"7px"}} /></button>
                </div>
            </div>
        </div>
        <div className="footer">
            
            <div className="footer-row-1">
                <div className="row1-left">
                    <p className='newsletter-header'>Stay Updated</p>
                    <p className='newsletter-text'>Subscribe to our newsletter for the latest location previews and special offers</p>
                    <div className="newsletter">
                        <input type="email" name="n-email"  placeholder='Yourown@gmail.com' id=""  style={{color:'#fdfdfd'}}/>
                        <button>Go <img src="forward.svg" alt="" /></button>
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
                <img src="prevue.png" alt="" />
            </div>
        </div>
        </>
    )
}