import { useState } from "react";
import { useCart } from "../context/cartContext.jsx"
import { CartItem } from "./CartItem.jsx"
import { SkeletonLoader } from './SkeletonLoader.jsx';
import { useOrder } from "../context/orderContext.jsx";


// страница Корзины

export const Cart = () => {

  const { cart }  = useCart();  // это наш написанный хук, он вызовет хук useContext(из cartContext.jsx), нужен только cart, cart = [ {id, title, img, additional, quantity}, {} ]

  // заводим перем-ые состояния: это внутренее осстяние(используем только в этом компоненте)
  const [ orderStatus, setOrderStatus ] = useState(null);
  const [ orderId, setOrderId ] = useState(null);                 // c сервера получим
  const [ modalIsOpen, setModalIsOpen ] = useState(false);      // изначально модалка закрыта(модалка откроется после отрпавки заказа)

  const { orderDetails, clearOrderDetails } = useOrder(); // наш хук


  const totalPrice = cart ? cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0) : 0; // acc=0

  //  или так:
  // const totalPrice = cart.reduce((acc, item) =>  acc + item.price * item.quantity, 0);
 


  const handleSubmit = async() => {    // async  тк отправка на сервер

    const orderData = {         // даннеые отправляемые на сервер
      ...orderDetails,
      items: cart.map((cartItem) => ({ id: cartItem.id, quantity: cartItem.quantity })),   // map вернет новый массив [{id, quantity}, {}].  Возвращаемый объект оборачиваем в круглые скобки чтобы сразу его вернуть
    };

    //console.log('orderData ', orderData)
    try{

    } catch(err){
      setOrderStatus('error');  // orderStatus = 'error'
      console.error(`Не удалось отправить данные: ${err}`);
    } finally{
      setModalIsOpen(true);     // modalIsOpen = true
    }

  };


  return (
      <section className="cart">
        <div className="container cart__container">
          <h2 className="cart__title"> Корзина ({ cart? cart.length : 0}) </h2>

          <ul className="cart__items">
            { cart ? ( cart.map((item) => (
                <CartItem key={item.id} data={item} />
                ))
              )
              : ( <SkeletonLoader /> )  // если товары корзины не подгрузилсь то вернет элмент <SkeletonLoader />
            } 
          </ul>

          <div className="cart__summary">
            <h3 className="cart__summary-title"> Итого </h3>
            <p className="cart__total"> { totalPrice }&nbsp;Р </p>
            <button className="cart__order-button" onClick={handleSubmit}> Заказать </button>
          </div>
        </div>
      </section>
  )
 
}