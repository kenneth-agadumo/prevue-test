import Lottie from "lottie-react"
import Footer from "../components/Footer"
import ComingSoon from "../coming-soon.json";

import DateRangePicker from "../components/ReservationCalendar";



export const Activities = () => {

    return(
        <>
        <div>
        <div className="content-row">
         
          <div className="content-item flex justify-center align-middle h-[100vh]">
            <Lottie style={{ width: "25%" }} animationData={ComingSoon} />
          
            
          </div>
        </div>
        <Footer/>
        </div>
        </>
    )
}