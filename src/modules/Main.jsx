import { Cart } from "./Cart.jsx";
import { Order } from "./Order.jsx";
import { Products } from "./Products.jsx";
import { Promo } from "./Promo.jsx";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";


export const Main = () => {

  return (
    
    <main className="main">
      <Routes>
        <Route  path='/' element={<Navigate to="/products?category=tea" />} /> {/* когда будем находиться на главной, то будет редирект на /products?category=tea */}

        <Route path="/products" element={
          <>     {/* на главной старнице(path="/") будут отбражаться два компонента <Promo /> и <Products /> */}
            <Promo />
            <Products />
          </>
        } />  
        
        {/* на  старнице корзины будут отбражаться компонет <Cart />  и <Order />: */}
        <Route path="/cart" element={   
          <>
            <Cart />
            <Order />
          </>
        } />
      </Routes>
    </main>
  )

  

};