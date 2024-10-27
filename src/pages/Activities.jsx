import Lottie from "lottie-react"
import Footer from "../components/Footer"


export const Activities = () => {

    return(
        <>
        <div>
        <h1>Helloa</h1>
        <div className="content-row">
         
          <div className="content-item">
            <Lottie style={{ width: "250px" }} animationData={ComingSoon} />
          </div>
        </div>
        <Footer/>
        </div>
        </>
    )
}