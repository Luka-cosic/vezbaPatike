import {MUSKE_PATIKE,SINGLE,ALL_ORDERS,COUNTER} from './types'

export const muskePatike =()=>{
    return{
        type : MUSKE_PATIKE
    }
}

export const single = (id,pol)=>{
    return{
        type : SINGLE,
        pol : pol,
        payload : id
    }
}

export const allOrders = (orders)=>{
    return{
        type : ALL_ORDERS,
        payload : orders
    }
}

export const counterAc = (counter)=>{
    return{
        type : COUNTER,
        payload : counter
    }
}