import axios from 'axios';

class ServisSveNaru {
   static getAllOrderedFromStorage() {
      const sneakersInBasket = localStorage.getItem('sneakersInBasket');
      return JSON.parse(sneakersInBasket)
   }

   // Delete chosen sneakers from basket
   static deleteItem(e, dispatch, allOrders, counterAc) {
      const id = parseInt(e.target.id);
      const getSneakersInBasket = JSON.parse(localStorage.getItem('sneakersInBasket'));
      let copyArr = [...getSneakersInBasket];
      let deleteItem = copyArr.splice(id, 1);
      localStorage.setItem('sneakersInBasket', JSON.stringify(copyArr));
      dispatch(allOrders(copyArr));

      let getCounterFromStorage = JSON.parse(localStorage.getItem('counter'));
      let newNumber = getCounterFromStorage;
      let oduzeto = newNumber - deleteItem[0].kol;
      localStorage.setItem('counter', oduzeto);
      dispatch(counterAc(oduzeto));
   }

   // Save ordered sneakers in dataBase
   static naruci(address) {
      const orderedSneakers = JSON.parse(localStorage.getItem('sneakersInBasket'));
      address.ordered_sneakers = orderedSneakers;
      return axios.post('/naruci', address);

   }

   static getOrderedSneakers() {
      const orderedSneakers = JSON.parse(localStorage.getItem('sneakersInBasket'));
      return orderedSneakers && orderedSneakers.length>0 ? true : null
   }


}

export default ServisSveNaru;