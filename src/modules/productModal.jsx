 // постаивли биилиотеку реакта: modal-react
import Modal from 'react-modal'; // используем готовую модалку(компонент) из реакта
import { API_URL } from '../const.js';
import { useState } from 'react';
import { useCart } from '../context/cartContext.jsx';


// компонент
//  модалка добавления кол-ва товара в Корзину из карточки товара

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


Modal.setAppElement('#root') // id=root в index.html (прикрпляем модалку)



//                                                    data = {id, title, price, img, additianal}--продукт
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


  const handleAddToCart = () => { // добавление товара data в Корзин
    console.log('data in handleAddToCart ', data)

    addToCart(data, quantity);
    onRequestClose(); // закрыли модалку товара
  };



  return (
    <Modal isOpen={isOpen}  onRequestClose={onRequestClose}  style={customStyles}  contentLabel='Product Modal'>   {/* <Modal> </Modal> это компонент реаакта */}
      
      <h2> {data.title} </h2>
      <img src={`${API_URL}${data.img}`} alt={data.title} />
      <p> {data.price}Р </p>
      {/* { console.log('data.additional in ProductModal ', data.additional) } */}
      <ul>
        {   
          // Object.entries(data.additional) делает из объекта  массив [[материал, медь], [объем, 250мл], [производитель, Индия]]
          Object.entries(data.additional).map(([key, value]) => (   // [key, value] = item деструткрировали, вернет на кажой итераии <li> </li>
              <li key={key}> 
                <strong> {key} </strong> {value}
              </li>
            )   
          )  
        }
      </ul>

      <div>
        <button onClick={handleDecrease}> - </button>
        <input  type='number'  value={quantity}  readOnly />  {/* readOnly- будем только считывать с это поля(то есть поле это неуправляемое)  */}
        <button onClick={handleIncrease}> + </button>
      </div>

      <button onClick={handleAddToCart}> Добавить в корзину </button>
      <button onClick={onRequestClose}> Закрыть </button>           {/* при нажатии на Закрыть, вызовется onRequestClose() */}
    </Modal>
  )
};