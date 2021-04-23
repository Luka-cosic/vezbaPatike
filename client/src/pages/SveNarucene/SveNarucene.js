import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import ServisSveNaru from './Servis/ServisSveNaru';
import {useDispatch} from 'react-redux';
import { allOrders, counterAc } from "../../store/actions";

import './css/SveNarucene.css';

function SveNarucene() {

    const [address, setAddress] = useState({
        ime : "",
        prezime : "",
        email : "",
        telefon : "",
        grad : "",
        ulica : ""
    })

    const dispatch = useDispatch();
    const greska = useRef();
    const uspesno = useRef();
    const state = useSelector((state) => { return state });

    useEffect(()=>{
        const getOrdered = ServisSveNaru.getAllOrderedFromStorage();
        if(getOrdered){
            dispatch(allOrders(getOrdered));
        }  
    },[]);
   
    const izbrisi = (e,dispatch,allOrders)=>{
        ServisSveNaru.deleteItem(e,dispatch,allOrders,counterAc);  
    }

    // Validacija and save in dataBase
    const naruci = (e)=>{
        e.target.value = "";
        let i = 1;
        if(address.ime === ""){
            setAddress({...address, ime : "Ovo polje je obavezno"});
            i = 0
        }
        if(address.prezime === ""){
            setAddress({...address, prezime : "Ovo polje je obavezno"});
            i = 0
        }
        if(address.email === ""){
            setAddress({...address, email : "Ovo polje je obavezno"});
            i = 0
        }
        if(address.telefon === ""){
            setAddress({...address, telefon : "Ovo polje je obavezno"});
            i = 0
        }
        if(address.grad === ""){
            setAddress({...address, grad : "Ovo polje je obavezno"});
            i = 0
        }
        if(address.ulica === ""){
            setAddress({...address, ulica : "Ovo polje je obavezno"});
            i = 0
        }
        if(i === 1){
            if(ServisSveNaru.getOrderedSneakers()){
                ServisSveNaru.naruci(address)
                .then(res=>{
                    uspesno.current.style.display = "block";
                    localStorage.removeItem("sneakersInBasket");
                    localStorage.removeItem("counter");
                    dispatch(allOrders([]));
                    dispatch(counterAc(0));
                })
            }else{
                greska.current.style.display = "block"
                
            }
            
        }
    }

    const allOrdered = state.allOrders.map((el,index) => {
       
        return (
            <tr key={index}>
                <td>
                    <img src={el.src}  alt=""/>
                </td>
                <td>{el.cena} din</td>
                <td>20%</td>
                <td>11350</td>
                <td>{el.kol}</td>
                <td>11245</td>
                <td>
                    <button id={`${index}`} className="btn btn-danger" onClick={(e)=>{izbrisi(e,dispatch,allOrders)}}>Izbrisi</button>
                </td>
            </tr>
        )
    })

    return (
        <div className="container">

            {/* Table of ordered sneakers */}

            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="display-4">Vasa Korpa</h1><hr />
                    <div className="row">
                        <table className="table card-table ">
                            <thead>
                                <tr>
                                    <th>Proizvod</th>
                                    <th>Cena</th>
                                    <th>Popust</th>
                                    <th>Cena sa popustom</th>
                                    <th>Kolicina</th>
                                    <th>Ukupno</th>
                                    <th>Izbrisi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrdered}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Order sneakers */}

            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="display-4">Adresa isporuke</h1><hr/>
                    <div className="row">
                        <div className="col-8 offset-2">
                            <div className="form-group">
                                <label for="ime">Ime</label>
                                <input onChange={(e)=>{setAddress({...address, ime: e.target.value})}} onClick={(e)=>{e.target.value = ""}} value={address.ime} type="text" id="ime" style={address.ime === "Ovo polje je obavezno" ? {color : "red"} : null} className="form-control mb-3" placeholder="Ime"/>
                            </div>
                            <div className="form-group">
                                <label for="ime">Prezime</label>
                                <input onChange={(e)=>{setAddress({...address, prezime: e.target.value})}} onClick={(e)=>{e.target.value = ""}} value={address.prezime} type="text" id="prezime" style={address.prezime === "Ovo polje je obavezno" ? {color : "red"} : null} className="form-control mb-3"  placeholder="Prezime"/>
                            </div>
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input onChange={(e)=>{setAddress({...address, email: e.target.value})}} onClick={(e)=>{e.target.value = ""}} value={address.email} type="email" id="email" style={address.email === "Ovo polje je obavezno" ? {color : "red"} : null} className="form-control mb-3" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <label for="telefon">Telefon</label>
                                <input onChange={(e)=>{setAddress({...address, telefon: e.target.value})}} onClick={(e)=>{e.target.value = ""}} value={address.telefon} type="text" id="telefon" style={address.telefon === "Ovo polje je obavezno" ? {color : "red"} : null} className="form-control mb-3" placeholder="Telefon"/>
                            </div>
                            <div className="form-group">
                                <label for="grad">Grad</label>
                                <input onChange={(e)=>{setAddress({...address, grad: e.target.value})}} onClick={(e)=>{e.target.value = ""}} value={address.grad} type="text" id="grad" style={address.grad === "Ovo polje je obavezno" ? {color : "red"} : null} className="form-control mb-3" placeholder="Grad"/>
                            </div>
                            
                            <div className="form-group">
                                <label for="postanski">Ulica</label>
                                <input onChange={(e)=>{setAddress({...address, ulica: e.target.value})}} onClick={(e)=>{e.target.value = ""}} value={address.ulica} type="text" id="ulica" style={address.ulica === "Ovo polje je obavezno" ? {color : "red"} : null} className="form-control mb-3" placeholder="Ulica"/>
                                
                            </div>
                            <button onClick={(e)=>{naruci(e)}} type="submit" className="btn btn-primary form-control naruci">Naruci</button> </div>
                            <div onClick={(e)=>{e.target.style.display = "none"}} className="alert alert_greska alert-danger form-control text-center" ref={greska} role="alert"> Narucite neke od nasih patika</div>
                            <div onClick={(e)=>{e.target.style.display = "none"}} className="alert alert-success alert_uspesno form-control text-center" ref={uspesno} role="alert">Uspesno ste narucili</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SveNarucene;