import { useCart } from "../context/cartContext.jsx"
import { CartItem } from "./CartItem.jsx"
import { SkeletonLoader } from './SkeletonLoader.jsx';


// страница Корзины

export const Cart = () => {

  const { cart }  = useCart();  // это наш написанный хук, он вызовет хук useContext(из cartContext.jsx), нужен только cart, cart = [ {id, title, img, additional, quantity}, {} ]

  const totalPrice = cart ? cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0) : 0; // acc=0

  //  или так:
  // const totalPrice = cart.reduce((acc, item) =>  acc + item.price * item.quantity, 0);
 




  return (
      <section className="cart">
        <div className="container cart__container">
          <h2 className="cart__title"> Корзина ({cart.length}) </h2>

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
            <button className="cart__order-button"> Заказать </button>
          </div>
        </div>
      </section>
  )
 
}