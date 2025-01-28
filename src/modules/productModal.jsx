 // постаивли биилиотеку реакта: modal-react
import Modal from 'react-modal'; // используем готовую модалку(компонент) из реакта
import { API_URL } from '../const.js';
import { useState } from 'react';
import { useCart } from '../context/cartContext.jsx';
import s from './ProductModal.module.css';      /* перменную s придумали сами, компонентный подход, эти стили будут применены тольо к этому компоненту  */



// компонент
//  модалка добавления кол-ва товара в Корзину (появляется при нажатии на карточку товара)

// const customStyles = { // стили для нашей модалки
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto', // чтобы не переопределялся
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };


Modal.setAppElement('#root') // id=root в index.html (прикрпляем модалку)



//                                                    data = {id, title, price, img, additianal}--продукт добавлемые в корзину
export const ProductModal = ({ isOpen, onRequestClose, data }) => { // onRequestClose -функция(закрвает модалку)

  // завели перем состояния: это внутренее осстяние(используем только в этом компоненте)
  const [ quantity, setQuantity ] = useState(1);    // кол-во товара data
  const { addToCart } = useCart();        // вызываем useCart , этот хук сами создали, он вызовет хук useContext(из cartContext.jsx)

 
  if(!data){
    return null; // модалку не вернет
  }


  const handleDecrease = () => {

    if(quantity > 1) {
      setQuantity(quantity - 1); // quantity уменьшился на 1
    }
  };


  const handleIncrease = () => {

    setQuantity(quantity + 1);
  };


  const handleAddToCart = () => { // добавление товара data в карточке товара/Корзин
    console.log('data in handleAddToCart ', data)

    addToCart(data, quantity);
    onRequestClose(); // закрыли модалку товара
  };




  return ( // модалка при нажатии на картчоку товара
    //                                                style={customStyles}
    <Modal isOpen={isOpen}  onRequestClose={onRequestClose}   className={s.modal}  overlayClassName={s.overlay}  contentLabel={data.title}>   {/* <Modal> </Modal> это компонент реаакта */}
      <img className={s.image}  src={`${API_URL}${data.img}`} alt={data.title} />
     
      <div className={s.content}>
        <div className={s.header}>
          <h2 className={s.title}> {data.title} </h2>
          <p className={s.price}> {data.price}&nbsp;Р </p>
        </div>
        
        {/* { console.log('data.additional in ProductModal ', data.additional) }  */}
        <ul className={s.list}>
          {   
            // Object.entries(data.additional) делает из объекта  массив [[материал, медь], [объем, 250мл], [производитель, Индия]]
            Object.entries(data.additional).map(([key, value]) => (   // [key, value] = item деструткрировали, вернет на кажой итераии <li> </li>
                <li className={s.item}  key={key}> 
                  <span className={s.field}> {key}:</span>   <span className={s.value}> {value} </span>
                </li>
              )   
            )  
          }
        </ul>

        <div className={s.footer}>
        <div className={s.count}>
          <button className={s.btn}  onClick={handleDecrease}> 
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="35" height="35" rx="3.5" stroke="#B8B8B8"/>
              <rect x="12" y="17" width="12" height="2" fill="#1D1C1D"/>
            </svg>
          </button>
          <input  className={s.number}  type='number'  value={quantity}  readOnly />  {/* readOnly- будем только считывать с это поля(то есть поле это неуправляемое)  */}
          <button className={s.btn}  onClick={handleIncrease}> 
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="35" height="35" rx="3.5" stroke="#B8B8B8"/>
                <rect x="12" y="17.25" width="12" height="1.5" fill="#1D1C1D"/>
                <rect x="17.25" y="24" width="12" height="1.5" transform="rotate(-90 17.25 24)" fill="#1D1C1D"/>
              </svg>
          </button>
        </div>

        <button className={s.btnAddCart} onClick={handleAddToCart}> Добавить </button>
      </div>
      </div>
     
     
      
      
      <button className={s.btnCloseCard} onClick={onRequestClose}>  {/* при нажатии на Закрыть, вызовется onRequestClose() */}
          <svg width="20" height="20" viewBox='0 0 20 20' fill="">
            <rect x="5.71228" y="14.195" width="12" height="1.5" transform="rotate(-45 5.71228 14.1975 )" fill="#B8B8B8" /> 
            <rect x="14.1976" y="15.2582" width="12" height="1.5" transform="rotate(-135 14.1976 15.2582)" fill="#B8B8B8" /> 
          </svg>
      </button>          
    </Modal>
  )
};
