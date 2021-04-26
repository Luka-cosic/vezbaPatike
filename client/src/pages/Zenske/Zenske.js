import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { single } from '../../store/actions';
import Servis from "../../servis/servis";
import "./css/Zenske.css";



function Zenske() {
    const svePatike = useSelector((state)=>{return state});
    const dispatch = useDispatch();
    const history = useHistory();

// Go to single page 

    const onDetaljnije = (current)=>{
        Servis.setCurrentIntoStorage({...current, pol:"zenske"});   
        dispatch(single(current.id,"zenske"));
        history.push('/single'); 
    }
    const zenskePatike = svePatike.zenske.map((el)=>{
        return(
            <div className="col-3 text-center" key={el.id}>
                <div className="card mb-2">
                    <div className="card-body">
                        <img src={el.src} style={{width:"200px",height:"200px"}} alt=""/>
                        <div  className="overImg" onClick={()=>{onDetaljnije(el)}}>Detaljnije</div>
                        <div className="row">
                            <h3 className="card-text ml-5 mt-3">{el.naziv}</h3>
                        </div><br />
                        <div className="row">
                            <h4 className="card-text ml-5" style={{color:"red"}}>{el.cena} din</h4>
                        </div>                  
                    </div>
                </div>
            </div>
        )
    })
    
    return(
       <div className="container">
           <div className="row">
               {zenskePatike}
           </div>
       </div>
           

    )
}

export default Zenske;