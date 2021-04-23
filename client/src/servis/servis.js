


class Servis{
    static single(state,action){
        const single = state[action.pol].filter(el=>el.id === action.payload);
        return single[0];   
    }

    static setCurrentIntoStorage(current){
        localStorage.setItem('current',JSON.stringify(current));   
    }
    
     static  getCounterFromStorage(){
         const counter =  localStorage.getItem('counter');
         return JSON.parse(counter);
     }

      // Put sneakers into basket
    static putInBasket(current,dispatch,allOrders,counter,counterAc){
        localStorage.setItem('current',JSON.stringify(current));
        if(localStorage.getItem('sneakersInBasket')){
            const orders = localStorage.getItem('sneakersInBasket');
            localStorage.setItem('sneakersInBasket',JSON.stringify([...JSON.parse(orders) ,current])); 
            
        }else{
            localStorage.setItem('sneakersInBasket',JSON.stringify([current]));  
        }
        dispatch(allOrders(JSON.parse(localStorage.getItem('sneakersInBasket'))));

        const numberOfordSne = localStorage.getItem('counter');
        localStorage.setItem('counter',JSON.stringify(JSON.parse(numberOfordSne) + counter));
        dispatch(counterAc(JSON.parse(localStorage.getItem('counter')))); 
    }

    static getCurrentFromStorage(){
        const current = localStorage.getItem('current');
        return JSON.parse(current);
    }
    
    // Change picture on hover
    static changePicture  (e,glavna){
        glavna.current.src = e.target.src  
    }

    // Increase number of sneakers 
    static  onPlus  (changeCounter,changeDeg,kol,deg,changeCurrent,counter,current){
        setTimeout(()=>{changeCounter((prev)=>{return prev + 1});},400);
        changeDeg((prev)=>{return prev + 360});
        kol.current.style.transform = `rotateY(${deg}deg)`;
        changeCurrent({...current, kol : counter + 1});      
    }

    // decrease number of sneakers
    static  onMinus  (changeCounter,changeDeg,kol,deg,changeCurrent,counter,current){
        setTimeout(()=>{changeCounter(prev=> prev < 1 ? 0 : prev - 1)},400);
        changeDeg((prev)=>{return prev + 360});
        kol.current.style.transform = `rotateY(${deg}deg)`;
        changeCurrent({...current, kol : counter - 1});      
    }

    // Zoom on main picture
    static  imageZoom(e,lens,glavna){
        let event = e;
        lens.current.style.backgroundImage = `url(${glavna.current.src})`;
        let odnos = 2;
        lens.current.style.backgroundSize = (glavna.current.width * odnos) + "px " + (glavna.current.height * odnos) + "px";
        function moveLens(event){
            let pos = getCursor(event);
          
            let positionLeft = pos.x - (lens.current.offsetWidth / 2);
            let positionTop = pos.y - (lens.current.offsetHeight / 2);

            if(positionLeft < - (lens.current.offsetWidth / 2)){
                positionLeft = - (lens.current.offsetWidth / 2);
            }
            if(positionTop > (glavna.current.height - lens.current.offsetHeight)){
                positionTop = (glavna.current.height - lens.current.offsetHeight);
            }
            if(positionLeft > (glavna.current.width - lens.current.offsetWidth)){
                positionLeft = (glavna.current.width - lens.current.offsetWidth);
            }
            if(positionTop < 0){
                positionTop = 0;
            }

            lens.current.style.left = positionLeft + "px";
            lens.current.style.top = positionTop + "px";

            lens.current.style.backgroundPosition = "-" + (pos.x * odnos) + "px " + "-" + (pos.y * odnos) + "px";

            
            
        }
        moveLens(event);

        function getCursor(event){
       
            let bounds = glavna.current.getBoundingClientRect();
        
            let x = event.pageX - bounds.left;
            let y = event.pageY - bounds.top;
          
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;

            return {'x' : x, 'y' : y};
        }
    }
}


export default  Servis;