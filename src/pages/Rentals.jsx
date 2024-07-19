
import { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { Dropdown } from "../components/Dropdown";
import { RentalCard } from "../components/Card";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import { storage } from "../firebaseConfig";

export const Rentals = () => {
    const { userData, rentals } = useGlobalState();
    const [imageUrls, setImageUrls] = useState({});
        /*
    ##########################
    ##########################
    ##########################
    ##########################
    ##########################
    ##########################
    ##########################
    */

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const rentalImagesMap = {};
                const rentalsRef = ref(storage, 'rentals');
                const userFolders = await listAll(rentalsRef);

                
                // Iterate through each rental
                for (const userFolder of userFolders.prefixes) {
                    const rentalFolders = await listAll(userFolder);

                    for(const rentalFolder of rentalFolders.prefixes){
                        const imageFiles = await listAll(rentalFolder);

                        if (imageFiles.items.length > 0) {
                            // Get the first image's URL
                            const firstImageFile = imageFiles.items[0];
                            const downloadURL = await getDownloadURL(firstImageFile);
                            allImages[rental.id] = firstImageUrl;
                        }
                    }
                    
                   
                }

                setImageUrls(allImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        if (rentals.length > 0) {
            fetchImages();
        }
    }, [rentals]);


    /*
    ##########################
    ##########################
    ##########################
    ##########################
    ##########################
    ##########################
    ##########################
    */

    return (
        <>
            <div className="rental-top-section">
                <h1>Shortlets</h1>
                <p>
                    Discover the perfect property. From short lets to long-term rentals and dream homes for sale, we offer a diverse range of housing options.
                    Immerse yourself in virtual tours, calculate expenses, and stay updated with the latest listings.
                </p>
            </div>
            <div className="rental-catalogue">
                <div className="catalogue-top-row">
                    <Dropdown itemNumber={3} itemsArray={['Filters', 'Type 1', 'Type 2']} />
                    <div className="rental-search-bar">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <img src="search.svg" alt="" />
                            <input type="text" placeholder="Search Property by name, type or location" />
                        </div>
                        <Dropdown itemNumber={3} itemsArray={['All Types', 'Recent', 'Popular']} />
                    </div>
                    <Dropdown itemNumber={3} itemsArray={['Featured', 'Recent', 'Popular']} />
                </div>
                <div className="catalogue">
                    {rentals.map((rental) => (
                        <RentalCard
                            key={rental.id}
                            address={rental.address}
                            image={imageUrls[rental.id] || 'default-image.png'}
                            price={rental.price}
                            width={'35.3%'}
                        />
                    ))}
                </div>
                <div className="load-more">
                    {/* <button>Load More</button> */}
                </div>
            </div>
            <div className="footer">
                <div className="footer-row-1">
                    <div className="row1-left">
                        <p className='newsletter-header'>Stay Updated</p>
                        <p className='newsletter-text'>Subscribe to our newsletter for the latest location previews and special offers</p>
                        <div className="newsletter">
                            <input type="email" name="n-email" placeholder='Yourown@gmail.com' id="" style={{ color: '#fdfdfd' }} />
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
    );
};