import { useOrder } from "../context/orderContext.jsx";


// компонент - заказа
export const Order = () => {

  const { orderDetails, updateOrderDetails } = useOrder();     // наш хук


  const handleChange = (evt) => { // при вводе в поле сработает событие (evt - объект события)]

    const target = evt.target; // <input>

    // либо: 
    // const { name, value } = evt.target;    //  деструткрировали

    updateOrderDetails(target.name, target.value);    // получаем обновленный { name: '', phone: '', address: '', payment: 'cash' }
    console.log('orderDetails ', orderDetails)
  };




  return (

    <section className="order">
      <div className="container">
        <h2 className="order__title"> Доставка </h2>
        
        <form className="order__form">
          <input className="order__input" type="text"  name="name"  value={orderDetails.name}  onChange={handleChange}  placeholder="Имя" />           {/* эти 3 поля  управляемые поля(вводим значения) */}
          <input className="order__input" type="text"  name="phone"  value={orderDetails.phone}  onChange={handleChange}  placeholder="Телефон" />     {/* при вводе в поле сработает событие onChange */}
          <input className="order__input order__input--address"  type="text"  name="address"  value={orderDetails.address}  onChange={handleChange}  placeholder="Адрес" />

          <fieldset className="order__payment">
            <h3 className="order__payment-title"> Оплата </h3>

            <label className="order__payment-label">
              <input className="order__radio" type="radio" name="payment"  value="card" onChange={handleChange}  checked={orderDetails.payment === 'card'} /> Картой
            </label>

            <label className="order__payment-label">
              <input className="order__radio" type="radio" name="payment"  value="cash" onChange={handleChange}  checked={orderDetails.payment === 'cash'}  /> Наличные  {/* defaultChecked */}
            </label>
          </fieldset>
        </form>
      </div>
    </section>
  )
  
}