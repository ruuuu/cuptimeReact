 // постаивли биилиотеку реакта: modal-react
import Modal from 'react-modal'; // используем готовую модалку из реакта
import { API_URL } from '../const.js';
import { useState } from 'react';


//  модалка добавлени колва товара в Корзину

const customStyles = { // стили для нашей модалки
  content: {
    top: '50%',
    left: '50%',
    right: 'auto', // чтобы не переопределялся
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


Modal.setAppElement('#root') // id=root в index.html




export const ProductModal = ({ isOpen, onRequestClose, data }) => { // onRequestClose -функция(зарпос на закрытие)

  // завели перем состояния:
  const [ quantity, setQuantity ] = useState(1); // колва товара



  if(!data){
    return null;
  }


  const handleDecrease = () => {

    if(quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {

  };



  return (
    <Modal isOpen={isOpen}  onRequestClose={onRequestClose}  style={customStyles}  contentLabel='Product Modal'>   {/* <Modal> </Modal> это компонент реаакта */}
      
      <h2> {data.title} </h2>
      <img src={`${API_URL}${data.img}`} alt={data.title} />
      <p> {data.price} </p>
      <ul>
        {   // Object.entries(data.additional) это [[материал, медь], [объем, 250мл], [производитель, Индия]]
          Object.entries(data.additional).map(([key, value]) => (   // [key, value] = item деструткрировали, вернет на кажой итераии <li>
              <li key={key}> 
                <strong> {key} </strong> {value}
              </li>
            )   
          )  
        }
      </ul>

      <div>
        <button onClick={handleDecrease}> - </button>
        <input  type='number'  value={quantity} readOnly />  {/* readOnly- будем только считывать с это поля  */}
        <button onClick={handleIncrease}> + </button>
      </div>

      <button onClick={handleAddToCart}> Добавить в корзину </button>
      <button onClick={onRequestClose}> Закрыть </button>           {/*при нажатии на Закрыть,вызовется onRequestClose() */}
    </Modal>
  )
};