import { createContext, useEffect, useState, useContext } from "react";



const OrderContext = createContext();  // создался контекст



export const OrderProvider = ({ children }) => { // провайдер котрый передает инормацию межд компонентами
  // children-компоненты(.jsx) которые  будут иметь доступ к данным(orderDetails, updateOrderDetails, clearOrderDetails) OrderContext

  // завели перем состояния
  const [ orderDetails, setOrderDetails ] = useState({ name: '', phone: '', address: '', payment: 'cash' }); 

  

  const updateOrderDetails = (field, value) => { // field это name/phone/address/payment
    
    // setOrderDetails({
    //   ...orderDetails,
    //   [field]: value
    // });

    // или лучше всего:
    setOrderDetails((prevDetails) => ({ ...prevDetails, [field]: value })); // фунуия внннутр вернет новый объект
  };



  const clearOrderDetails =() => { // чтобы заказ очищался не перзагружая страницу 

    setOrderDetails({ name: '', phone: '', address: '', payment: 'cash' });
  };
 


  return (
    <OrderContext.Provider  value={{ orderDetails, updateOrderDetails, clearOrderDetails }}>
        {children}                {/* children(др компоненты) имеют доступ к orderDetails, updateOrderDetails, clearOrderDetails */}
    </OrderContext.Provider>
  );
};


export const useOrder = () => useContext(OrderContext); //  useOrder это наш хук, его придумали сами. Он отдает данные контекста