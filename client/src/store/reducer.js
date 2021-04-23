import { SINGLE, ALL_ORDERS,COUNTER } from './types';
import { svePatike } from './initState';
import Servis from "../servis/servis";


function reducer(state = svePatike, action) {
    switch (action.type) {
        case SINGLE :
           const current = Servis.single(state,action);
           return {...state, current: current};
        case ALL_ORDERS :
            return {...state, allOrders : action.payload};
        case COUNTER :
            return {...state, counter : action.payload}
        default: return state;
    }
}

export default reducer; 