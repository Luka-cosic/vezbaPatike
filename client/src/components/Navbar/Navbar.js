import React, {useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Servis from "../../servis/servis";
import { counterAc } from '../../store/actions';
import { useSelector, useDispatch } from "react-redux";
import "./css/Navbar.css";



function Navbar() {

    const dispatch = useDispatch();

    useEffect(()=>{
        const counter = Servis.getCounterFromStorage();
        dispatch(counterAc(counter));
        
    },[])
    let divOnHover = useRef();
    let numberOfOrders = useRef();

    const state = useSelector((state) => { return state });
   
    
    const all = state.allOrders.map((el,index) => {
        return (
            <div className="row" key={index}>
                <div className="mainForHover">
                    <img className="hoverImg" style={{ width: "100px", height: "100px" }} src={el.src} alt="" />
                    <h5 className="hoverName">{el.naziv}</h5>
                    <h6 className="hoverPrice">{el.cena} din</h6>
                    
                </div>
            </div>
        )
    })

    const onHover = ()=>{
        divOnHover.current.style.display = "block";
   
    }
    const onLeave = ()=>{
        divOnHover.current.style.display = "none";
    }
  
    
    return (
        <div className="container">
            <nav className="navbar navbar-expand-sm navbar-light bg-dark">

                <Link to="/" className="brand">Pocetna</Link>
                <ul className=" navbar-nav m-auto">
                    <li className="nav-item">
                        <Link to="/muske" className="linkovi">Muskarci</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/zenske" className="linkovi">Zene</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/decije" className="linkovi">Deca</Link>
                    </li>
                </ul>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-heart slicice mr-5" viewBox="0 0 16 16">
                    <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
                <Link to="sveNarucene">
                <div className="basketIcon" onMouseOver={()=>{onHover()}} onMouseLeave={()=>{onLeave()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-cart3 slicice" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                </div>
                </Link>
                <div className="numberOfOrders" ref={numberOfOrders}>{state.counter}</div>
            </nav>
            <div className="divOnHover" ref={divOnHover}>
                {all}      
            </div>
          
        </div>


    )
}

export default Navbar;