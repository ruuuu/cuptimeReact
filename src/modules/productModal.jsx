 // постаивли биилиотеку реакта: modal-react
import Modal from 'react-modal'; // используем готовую модалку из реакта
import { API_URL } from '../const.js';
import { useState } from 'react';
import { useCart } from '../context/cartContext.jsx';



//  модалка добавлени кол-ва товара в Корзину из карточки товара

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



//                                                    data = {id, name, price}
export const ProductModal = ({ isOpen, onRequestClose, data }) => { // onRequestClose -функция(зарпос на закрытие)

  // завели перем состояния:
  const [ quantity, setQuantity ] = useState(1); // кол-во товара
  const { addToCart } = useCart();  // useCart этот хук сами создали, он вызовет хук useContext(из cartContext.jsx)

  //, removeFromCart, updateQuantity

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


  const handleAddToCart = () => { // добавление товара в Корзин
    console.log('data ', data)

    addToCart(data, quantity);
    onRequestClose(); // закрыли модалку
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
      <button onClick={onRequestClose}> Закрыть </button>           {/* при нажатии на Закрыть, вызовется onRequestClose() */}
    </Modal>
  )
};