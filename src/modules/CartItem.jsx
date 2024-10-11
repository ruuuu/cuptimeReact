import { useState } from "react";
import { API_URL } from "../const.js"
import { useCart } from "../context/cartContext.jsx"


export const CartItem = ({ data }) => { // data = { id, img, title, additional, quantity}


  // завели перем состяния: это внутренее осстяние(используем только в этом компоненте)
  const [ itemQuantity, setItemQuantity ] = useState(data.quantity); //  кол-во определенного товара

  const { updateQuantity, removeFromCart, cart } = useCart(); // наш хук



  const handleDecrease = () => {

    const newQuantity = itemQuantity - 1;
    if(newQuantity > 0){
      setItemQuantity(newQuantity);
      updateQuantity(data.id, newQuantity); //  и обновятся данные в localStorage
    } 
    else{
      updateQuantity(data.id, 0);
      // или 
      // removeFromCart(data.id);
    }
  };



  const handleIncrease = () => {

    const newQuantity = itemQuantity + 1;
   
    setItemQuantity(newQuantity);
   
    updateQuantity(data.id, newQuantity);
  };




  return (

    <li className="cart-item">
      <img className="cart-item__image" src={`${API_URL}${data.img}`} alt={data.title} />

      <div className="cart-item__info">
          <h3 className="cart-item__title"> {data.title} </h3>
          <div className="cart-item__quantity">
            <button className="cart-item__quantity-button cart-item__quantity-button--minus"  onClick={ handleDecrease }> - </button>
            <input className="cart-item__quantity-input" type="number" value={itemQuantity} readOnly />   {/*  readOnly т е вбивать значение в поле не будем((то есть поле это неуправляемое))  */}
            <button className="cart-item__quantity-button cart-item__quantity-button--plus"  onClick={ handleIncrease }> + </button>
          </div>
          <p className="cart-item__price"> {data.price * data.quantity}&nbsp;P </p>
      </div>
    </li>
  )
}