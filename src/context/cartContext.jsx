import { createContext, useEffect, useState, useContext } from "react";



const CartContext = createContext();  // создался контекст



export const CartProvider = ({ children }) => { // провайдер котрый передает инормацию межд компонентами
  // children-компоненты(.jsx) которые  будут иметь доступ к методам(cart, addToCart, removeFromCart, updateQuantity) CartContext

  // завели перем состояния cart
  const [ cart, setCart ] = useState(null); // товары корзины хрнаим в localStorage

  

  useEffect(() => {
    console.log('зашли во 1-ый useeffect: получаем данные из localStorage и записали в cart')

    const storeCart = JSON.parse(localStorage.getItem('cart') || '[]')  // получаем даыне из localStorage(там json-строки), поэтому парсим
    setCart(storeCart); // cart=[{},{},{}] данные из localStorage
  
  }, []); // коллбэк выпонится 1 раз (при запуске программы)



  useEffect(() => {
      console.log('зашли во 2-ой useeffect: записываем обновленный cart в localStorage')

      if(Array.isArray(cart)){      // если cart это массив
        localStorage.setItem('cart', JSON.stringify(cart));          // cart станет строкой,  отправка товаров Корзины в localStorage
      }
   
  }, [ cart ]); // когда будет меняться cart(удаяем/добавляем товар), тогда будет вызываться коллбэк




  const addToCart = (product, quantity) => { // product - { id, title, img, price, additional } добавляемый товар и его колво

    const newCart = [...cart]; // сделали копию массива cart(три точки кладут элементы в пустой массив и раскладывают через запятую), новый массив товаров
      
    const itemIndex = newCart.findIndex((cartItem) => cartItem.id === product.id);  // нашли индекс товара которого нет в Корзине

    
    if(itemIndex >= 0) {  // если в Корзине есть товар product
      newCart[itemIndex].quantity += quantity;
    }
    else{
      newCart.push({ ...product, quantity });  // если в Корзине нет товара product, ...product вернет {id, title, price, img, additional}
    }

    setCart(newCart); // обновили cart= newCart 
  };




  const removeFromCart = (productId) => {
    // const filtercart = cart.filter((cartItem) => cartItem.id !== productId)
    // console.log('filtercart ', filtercart)

    setCart(cart.filter((cartItem) => cartItem.id !== productId)); // filter() вернет новый массив элемнтов удовлеворяющие условию, и обновили cart 
    //  обновили cart и  в этот момент срабоатет коллбэк из 2 -го useEffect
    };




  const updateQuantity = (productId, quantity) => { // в поле ввода товара  ввели  колво quantity

    if(quantity <= 0 ){
      removeFromCart(productId);
    }
    else{
      const newCart = cart.map((cartItem) => {      // вернет новый массив с измененными элементами [{ id, title, img, price, additional, quantity }, {},{}  ]
        if(cartItem.id === productId){
          return  { ...cartItem, quantity }; // вернет объект {id, title, img, price, additional, quantity}, где  ...cartItem = {id, title, img, price, additional, quantity} c обновленным quantity
        } 
        else{
          return cartItem;
        }
      }); 

      
      setCart(newCart); // обновили cart и  в этот момент срабоатет коллбэк из 2 -го useEffect
    }
  };



  const clearCart = () => {
    setCart([]); // очитсили массив cart 
  };



  return (
    <CartContext.Provider  value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
        {children}   {/* children(др компоненты) имеют доступ к cart, addToCart, removeFromCart, updateQuantity */}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext); //  useCart  это наш хук, его придумали сами. Он отдает данные контекста