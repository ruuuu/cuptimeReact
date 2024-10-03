 // постаивли биилиотеку реакта: modal-react
import Modal from 'react-modal';
import { API_URL } from '../const.js';


// модалка для продукта

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

  if(!data){
    return null;
  }

  return (
    <Modal isOpen={isOpen}  onRequestClose={onRequestClose}  style={customStyles}  contentLabel='Product Modal'>   {/* компонент реаакта */}
      
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

      <button onClick={onRequestClose}> Закрыть </button>           {/*при нажатии на Закрыть,вызовется onRequestClose() */}
    </Modal>
  )
};