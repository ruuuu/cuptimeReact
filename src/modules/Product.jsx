import { API_URL } from "../const.js";
import { useState } from "react";
import { ProductModal } from "./productModal.jsx";


//                        props
export const Product  = ({ data }) => { // props = { data: {image, price, title}}, деструктурировали(вытащили data)

  // console.log(props)  
  // завели перем состояния:
  const [ modalIsOpen, setModalIsOpen ] = useState(false); // изначально модалка закрыт


  const openModal = (evt) => {
    evt.preventDefault(); // чтобы при нажатии на картчоку продукта не было перзагрузки страницы
    setModalIsOpen(true);
  };


  const closeModal = () => {
    
    setModalIsOpen(false);
  };


  return (
    <li className="products__item">
      <a className="product__link" href="#"  onClick={openModal}  aria-label={`Открыть модальное окно для ${data.title}`}>
        <article className="product">
          <img className="product__image" src={`${API_URL}${data.img}`} alt={data.title} />

          <div className="product__content">
            <h3 className="product__title"> {data.title} </h3>
            <p className="product__price"> {data.price} P</p>
          </div>
        </article>
      </a>


      <ProductModal isOpen={modalIsOpen}  onRequestClose={closeModal}  data={data} /> 
    </li>
  )
};