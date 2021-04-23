import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./css/Muske.css";
import { single } from '../../store/actions';
import { useHistory } from 'react-router-dom';
import Servis from "../../servis/servis";


function Muske() {
    const svePatike = useSelector((state) => { return state });
    const dispatch = useDispatch();
    const history = useHistory();

    //   Go to single page 

    const onDetaljnije = (current) => {
        Servis.setCurrentIntoStorage(current);
        dispatch(single(current.id, "muske"));
        history.push('/single');
    }


    const muskePatike = svePatike.muske.map((el) => {
        return (
            <div className="col-3 text-center" key={el.id}>
                <div className="card mb-2">
                    <div className="card-body">
                        <figure>
                            <img className="muskeImg" src={el.src} alt="" />
                        </figure>
                        <div className="overImg" onClick={() => { onDetaljnije(el) }}>Detaljnij</div>
                        <div className="row">
                            <h3 className="card-text ml-5 mt-3">{el.naziv}</h3>
                        </div><br />
                        <div className="row">
                            <h4 className="card-text ml-5" style={{ color: "red" }}>{el.cena} din</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="container">
            <div className="row">
                {muskePatike}
            </div>
        </div>


    )
}

export default Muske;