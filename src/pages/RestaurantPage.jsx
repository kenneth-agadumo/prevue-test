import {ImageSlider} from '../components/ImageSlider'
import '../layout.css'

export const RestaurantPage = () => {
    const images = [
        'hard-rock.png',
        'crust.png',
        'hero-bg.png',
      ];
    return(
        <>
            <div className="slider">
                <ImageSlider images={images} />
            </div>

            <div className="description">
                <div className="description-left">
                    <div className="description-info">
                        <h4>Cactus Restaurant</h4>
                        <p>Okunde Bluewaters scheme Twinwaters Lagos, off Remi Olowude St, Eti-Osa, Lekki</p>
                        <img src="prevue.png" alt="" /><img src="prevue.png" alt="" /><img src="prevue.png" alt="" /><img src="prevue.png" alt="" />
                    </div>
                    <div className="description-about">
                        
                    </div>
                </div>
                <div className="description-right">

                </div>
            </div>
        </>
    )
}