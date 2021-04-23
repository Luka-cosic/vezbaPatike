import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Servis from '../../servis/servis';
import { allOrders, counterAc } from '../../store/actions';
import './css/Single.css';

function Single() {

    const dispatch = useDispatch();
    const [current, changeCurrent] = useState({});
    const [counter, changeCounter] = useState(0);
    const [deg, changeDeg] = useState(360);


    const muskeVel = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];

    let glavna = useRef();
    let lens = useRef();
    let kol = useRef();
    let greska = useRef();


    const velicine = muskeVel.map((el, index) => {
        return (
            <div id={index} className="col-2 vel" key={index} onClick={(e) => { changeCurrent({ ...current, vel: e.target.innerHTML }) }}>
                <NavLink to="#">
                    <h4>{el}</h4>
                </NavLink>
            </div>
        )
    });

    useEffect(() => {
        const getCurrent = Servis.getCurrentFromStorage();
        if (getCurrent) {
            changeCurrent(getCurrent);
        }

    }, []);

    // Increase number of sneakers 
    const onPlus = () => {
        Servis.onPlus(changeCounter, changeDeg, kol, deg, changeCurrent, counter, current)
    }

    // Change picture on hover
    const changePicture = (e) => {
        Servis.changePicture(e, glavna);
    }

    // Put sneakers into basket
    const putInBasket = (dispatch, allOrders, counterAc, counter) => {
        if (current.vel === null || current.vel === "" || current.kol === 0) {
            greska.current.style.display = 'block';
        } else {
            Servis.putInBasket(current, dispatch, allOrders, counterAc, counter);
        }
    }


    return (
        <div className="container">
            <div className="row">

                {/* Left  */}

                <div className="col-6">
                    <div className="img-container">
                        <div onMouseMove={(e) => { Servis.imageZoom(e, lens, glavna) }} id="lens" ref={lens}></div>
                        <img onMouseMove={(e) => { Servis.imageZoom(e, lens, glavna) }}
                            src={current.src} ref={glavna} id="glavna" alt="" />
                    </div>
                    <img onMouseOver={(e) => { changePicture(e); }}
                        className="sporedne" src={current.src2} alt="" />
                    <img onMouseOver={(e) => { changePicture(e); }}
                        className="sporedne" src={current.src3} alt="" />
                    <img onMouseOver={(e) => { changePicture(e); }}
                        className="sporedne" src={current.src4} alt="" />
                    <img onMouseOver={(e) => { changePicture(e); }}
                        className="sporedne" src={current.src5} alt="" />
                </div>

                {/* Right side */}

                <div className="col-6 ">
                    <div className="row mt-1000">
                        <h1 className="display-4 mb-4" style={{ color: "red" }}>{current.cena}din</h1>
                    </div><hr /><br /><br />
                    <div className="row" >
                         {velicine}
                    </div>
                    <div className="row">
                        <div className="col-8 offset-2">
                            <div id="dodaj" onClick={() => { putInBasket(dispatch, allOrders, counter, counterAc) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-basket3 float-right mr-3 mt-3" viewBox="0 0 16 16">
                                    <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6h-9.21z" />
                                </svg>
                                <p>Dodaj u korpu</p>
                            </div>
                            <div class="alert alert-danger form-control" onClick={(e) => { e.target.style.display = "none" }} ref={greska} role="alert">Niste odabrali velicinu ili kolicinu patika</div>
                            <div className="brojac">
                                <div id="kol" ref={kol}>{counter}</div>
                                <div id="plus" onClick={() => { onPlus() }}>+</div>
                                <div id="minus" onClick={() => { Servis.onMinus(changeCounter, changeDeg, kol, deg, changeCurrent, counter, current) }}>-</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>


    )
}

export default Single;