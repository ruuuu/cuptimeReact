import { createContext, useEffect, useState } from "react";



const CartContext = createContext();  // создался контекст



export const CartProvider = ({ children }) => { // провайдер котрый передает инормацию межд компонентами
  // children-компоненты(.jsx) которые  будут иметь доступ к данным в CartContext

  // завели перем состояния
  const [ cart, setCart ] = useState([]); // товары корзины хрнаим в localStorage

  

  useEffect(() => {

    const storeCart = JSON.parse(localStorage.getItem('cart') || '[]')  // получаем даыне из LocalStorage(там json-строки), поэтому парсимbcv
    setCart(storeCart); // cart=[{},{},{}] данные из loccalStorage
  
  }, []); // коллбэк выпонится 1 раз при запуске программы



  useEffect(() => {
      // отправка товаров Корзины в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));  // cart станет строкой

  }, cart); // когда будет меняться cart(удаяем товар/добавляем), тогда будет вызываться коллбэк




  const addToCart = (product, quantity) => { // product - { id, title, image, price, additional } добавляемый товар и его колво

    console.log('in addToCart product is ', product)

    const newCart = [...cart]; // сделали копию массива cart(три точки кладут элементы в пустой массив и раскладывают через запятую), новый массив товаров
    // [{id, quantity }, {}]
    
    const itemIndex = newCart.findIndex((cartItem) => (cartItem.id === product.id));  // индекс товара которого нет в Корзине

    
    if(itemIndex >= 0) {  // если в Корзине есть товар product
      newCart[itemIndex].quantity += quantity;
    }
    else{
      newCart.push({ ...product, quantity });  // если в Корзине нет товара product, ...product вернет {id, name, price}
    }


    setCart(newCart); // cart= newCart
    // localStorage.setItem('cart', JSON.stringify(cart));  // обновлем localStorage
  };




  const removeFromCart = (productId) => {
    // const filtercart = cart.filter((cartItem) => cartItem.id !== productId)
    // console.log('filtercart ', filtercart)

    setCart(cart.filter((cartItem) => cartItem.id !== productId)); // filter() вернет новый массив элемнтов удовлеворяющие условию, и обновили cart 
  };




  const updateQuantity = (productId, quantity) => { // в поле ввода товара  ввели  колво quantity

    if(quantity <= 0 ){
      removeFromCart(productId);
    }
    else{

      const newCart = cart.map((cartItem) => {      // вернет новый массив с измененными элементами [{ id, title, image, price, additional, quantity }, {},{}  ]
        console.log('newCart in map() ', newCart)

        if(cartItem.id === productId){
          return  { ...cartItem, quantity }; // вернет объект, ...cartItem = {id, title, image, price, additional, quantity} c обновленным quantity
        } 
        else{
          return cartItem;
        }
      }); 

      setCart(newCart);
    }
  };





  return (
    <CartContext.Provider  value={{ cart, addToCart, removeFromCart, updateQuantity }}>
        {children}   {/* children(др компоненты) имеют доступ к cart, addToCart, removeFromCart, updateQuantity */}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext); //  useCart  это наш хук, его придумали сами. Он отдает данные контекста