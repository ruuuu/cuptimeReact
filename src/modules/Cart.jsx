import { useState } from "react";
import { useCart } from "../context/cartContext.jsx"
import { CartItem } from "./CartItem.jsx"
import { SkeletonLoader } from './SkeletonLoader.jsx';
import { useOrder } from "../context/orderContext.jsx";
import { API_URL } from "../const.js";
import Modal from 'react-modal'; // используем готовую модалку(компонент) из реакта


// компопнент-Корзина
Modal.setAppElement('#root') // id=root в index.html (прикрпляем модалку)


// страница Корзины

export const Cart = () => {

  const { cart, clearCart } = useCart();  // это наш написанный хук, он вызовет хук useContext(из cartContext.jsx), нужен только cart и clearCart(), cart = [ {id, title, img, additional, quantity, price}, {} ]

  // заводим перем-ые состояния: это внутренее осстяние(используем только в этом компоненте)
  const [ orderStatus, setOrderStatus ] = useState(null);
  const [ orderId, setOrderId ] = useState(null);                 // c сервера получим (после отправки данных формы)
  const [ modalIsOpen, setModalIsOpen ] = useState(false);      // изначально модалка закрыта(модалка откроется после отрпавки заказа)
  const { orderDetails, clearOrderDetails } = useOrder();       // наш хук, сами создали

  

  const totalPrice = cart ? cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0) : 0; // acc=0

  //  или так:
  // const totalPrice = cart.reduce((acc, item) =>  acc + item.price * item.quantity, 0);
 


  const handleSubmit = async() => {    // async  тк отправка на сервер

    const orderData = {         // данные отправляемые на сервер
      ...orderDetails,  // три точки разложат свойства через запятую { name: '', phone: '', address: '', payment: 'cash' }
      items: cart.map((cartItem) => ({ id: cartItem.id, quantity: cartItem.quantity }))
    }   // map вернет новый массив [{ id, quantity }, {}].  Возвращаемый объект оборачиваем в круглые скобки чтобы сразу его вернуть
    

    // orderData = {}
    // const items = cart.map((cartItem) => { // [ { id: , quantity: }, {id: , quantity: }]
    //   return { id: cartItem.id, quantity: cartItem.quantity };
    // })

    
    //console.log('orderData ', orderData)    // { name: '',  phone: '',  address: '',  payment: 'cash',  items: [{id, quantity},{},{}] }

    try{
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if(!response.ok){
        throw new Error('Ошибка при отправке данных');
      }

      const result = await response.json();
      console.log('result ', result)
      setOrderStatus('success');
      setOrderId(result.order.id);
      clearCart();
      clearOrderDetails();
      setModalIsOpen(true); 
    } 
    catch(err){
      setOrderStatus('error');  // orderStatus = 'error'
      console.error(`Не удалось отправить данные: ${err}`);
    } 
    finally{
      setModalIsOpen(true);     // modalIsOpen = true
    }
  };



  const closeModal = () => {
    setModalIsOpen(false)
  };



  return (
      <section className="cart">
        <div className="container cart__container">
          <h2 className="cart__title"> Корзина ({ cart? cart.length : 0}) </h2>

          <ul className="cart__items">
            { cart ? ( cart.map((item) => (                   // вернет [<CartItem />, </CartItem/>]
                  <CartItem  key={item.id}  data={item} />
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

        <Modal className="modal-cart"  overlayClassName="modal-cart__overlay"> 
            <h2 className="modal-cart__title">
              {orderStatus === 'success' ? `Ваш заказ  ${orderId} успешно оформлен` : 'Произошла ошибка оформления заказа'} 
            </h2>

            <button className="modal-cart__button"  onClick={closeModal}> Закрыть </button>
        </Modal>
      </section>
  )
 
}