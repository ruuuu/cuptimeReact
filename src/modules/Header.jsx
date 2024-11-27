import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/cartContext.jsx";



// компонент
export const Header = () => {

  const location = useLocation(); // хук реакта
  console.log('хук location ', location)

  const { cart } = useCart(); // наш хук



  const getActiveClass = (category) => {  // вернет активный класс .active

    const currentCategory = new URLSearchParams(location.search).get('category');   // URLSearchParams () встроен в js
    return currentCategory === category ? "active" : "";
  } 




  return (
    
    <header className="header">
        <div className="container header__container">
          <Link to="/" className="header__logo-link">  {/*  в реакте вместо ссылки <a> испоьзуем Link(с ним станица перезагружатся не будет), вместо htrf испльзуетс to  */}
            <img className="header__logo" src="img/logo.svg" alt="Логотип - Cup Time" /> {/*  из папки public берет картинки  */}
          </Link>

          <nav className="header__nav">
            <ul className="header__menu">
              <li className="header__menu-item">
                <Link className={`header__menu-link ${getActiveClass('tea')}`}  to="/products?category=tea">Чай</Link>    {/*category это search-паратер*/}
              </li>
              <li className="header__menu-item">
                <Link className={`header__menu-link ${getActiveClass('coffee')}`}  to="/products?category=coffee">Кофе</Link> 
              </li>
              <li className="header__menu-item">
                <Link className={`header__menu-link ${getActiveClass('teapots')}`}  to="/products?category=teapots">Чайники</Link>
              </li>
              <li className="header__menu-item">
                <Link className={`header__menu-link ${getActiveClass('cezves')}`}  to="/products?category=cezves">Турки</Link>
              </li>
              <li className="header__menu-item">
                <Link className={`header__menu-link ${getActiveClass('other')}`}  to="/products?category=other">Прочее</Link>
              </li>
            </ul>
          </nav>

          <Link to="/cart" className="header__cart-link" aria-label="Открыть корзину"> {cart ? cart.length : 0} </Link>  {/*  aria-label добавляем для кнопок ук отрых нет надписей(для слепых) */}
        </div>
      </header>
  )
};