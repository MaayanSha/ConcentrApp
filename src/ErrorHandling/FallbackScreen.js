import brainMechanic from '../images/brainMechanic.jpg';
import "./error.css";
function FallbackScreen({ error, resetErrorBoundary }) {
    return (
        <div className="centered" role="alert">
            <img style={{justifyContent:"center", width:"70%"}} src={brainMechanic} alt="Error Fallback"/>
            <h2 className="header-stu">Something went wrong..</h2>
            <h3 style={{color:"orange"}}><button className="transparent-button" onClick={resetErrorBoundary}>Try reloading page</button></h3>
            <h6 className="header-stu">If you really need to know, below are the technical details:</h6>
            <pre>{error.message}</pre>
        </div>
    )
}
export default FallbackScreen;