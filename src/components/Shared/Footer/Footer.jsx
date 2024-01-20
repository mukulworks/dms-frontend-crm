import React, { useState ,useRef,useEffect} from 'react';
import youtube from '../../../images/youtube (2).svg';
import Facebook from '../../../images/Facebook_New_Logo_(2015).svg';
import linkedin from '../../../images/linkedin-logo@logotyp.us.svg';
import Dialer from '../Dialer/Dialer';
import Time from './Timer.jsx';

 

const Footer = ()=>{
    const [isOpen, setIsOpen] = useState(false)
  

    //const [counter, setCounter] = useState(1);
    // const [hoursCounter, sethoursCounter] = useState(0);
    // //const [minutesCounter, setminutesCounter] = useState(0);
    // useEffect(() => {
    //     // counter>0  && setTimeout(() => setCounter(counter + 1), 100);
        
    //     // minutesCounter>0 && setTimeout(()=>setminutesCounter(minutesCounter+1),10000);
       
    //     hoursCounter>0 && setTimeout(()=>sethoursCounter(hoursCounter+1),1000);

    //   }, [hoursCounter]);
  
    return (
        
        <React.Fragment>
            <footer className="container-fluid mt-auto fixed-bottom" >
                <div className="row bg-light">
                    <div className="col-sm-4">
                        <ul className="nav justify-content-start footer-social">
                            <li className="nav-item">
                                <a className="nav-link" href="#"><img src={youtube} alt=""></img></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><img src={Facebook} alt=""></img></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><img src={linkedin} alt=""></img></a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-8">
                        <ul className="nav justify-content-end font-15">
                            <li className="nav-item">
                                <a className="nav-link" href="#" >
                                <Time></Time>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">HelpDesk</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">CCMS (0)</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Calendar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Mail</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setIsOpen(!isOpen)}>Agent Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
            {isOpen && <Dialer />}
        </React.Fragment>
    )
}

export default Footer;