import { createContext, useEffect, useState } from "react";



export const CartContext = createContext();  // создался контекст



export const CartProvider = ({ children }) => { // провайдер котрый передает инормацию межд компонентами
  // children-компоненты которые  будут иметь доступ к данным в CartContext

  // завли пер
  const [ cart, setCart ] = useState([]); // товары корзины хрнаим в localStorage

  

  useEffect(() => {

    const storeCart = JSON.parse(localStorage.getItem('cart') || '[]')  // получаем даыне из LocalStorage(там json-строки), поэтому парсимbcv
    setCart(storeCart); // cart=[{},{},{}] данные из loccalStorage
  
  }, []); // коллбэк выпонится 1 раз при запуске программы



  useEffect(() => {
      // отправка товаров Корзины в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));  // cart станет строкой

  }, cart); // когда будет меняться cart(удаяем товар/добавляем), тогда будет вызываться коллбэк



  return (
    <CartContext.Provider  value={{ cart }}>
        {children}   {/* children(др компоненты) имеют доступ к cart */}
    </CartContext.Provider>
  )
};


export const useCart = () => useContext(CartContext); //  useCart  это наш хук, его придумали сами. Он отдает данные контекста