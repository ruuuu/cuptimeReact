import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/cartContext.jsx";
import { useProducts } from "../context/productContext.jsx";
import { useState } from "react";



// компонент
export const Header = () => {

  const location = useLocation(); // хук реакта
  console.log('хук location ', location)

  const { cart } = useCart(); // наш самописный хук
  const { categories } = useProducts();  //  наш самописный хук
  // заводим перем состояния:
  const [ isMenuOpen, setIsMenuOpen ] = useState(false); // моб меню закрыто



  const getActiveClass = (category) => {  // вернет активный класс .active

    const currentCategory = new URLSearchParams(location.search).get('category');   // URLSearchParams () встроен в js
    return currentCategory === category ? "active" : "";
  } 


  const openMenu = () => {
    setIsMenuOpen(true);       // isMenuOpen = true
  } 


  const closeMenu = () => {
    setIsMenuOpen(false);       // isMenuOpen = false
  }



  return (
    
    <header className="header">
        <div className="container header__container">
          <Link to="/" className="header__logo-link">  {/*  в реакте вместо ссылки <a> испоьзуем Link(с ним станица перезагружатся не будет), вместо htrf испльзуетс to  */}
            <img className="header__logo" src="img/logo.svg" alt="Логотип - Cup Time" /> {/*  из папки public берет картинки  */}
          </Link>

          <nav className={`header__nav ${isMenuOpen ? "active" : ""}`}>
            <ul className="header__menu">
              {/*  Object.entries(categories) из объекта сделает массив  [["tea", "Чай"], ["coffee", "Кофе"]]   */}
              { Object.entries(categories).map(([key, value]) => (                   // вернет [<Link>, <Link>]
                  <li className="header__menu-item"  key={key}>
                    {/* category это search-парамтры: */}
                    <Link className={`header__menu-link ${getActiveClass(key)}`}  to={`/products?category=${key}`}  onClick={closeMenu}> {value} </Link>   
                  </li>
              ))}
            </ul>

            <button class="header__close-btn"  aria-label="Закрыть меню"  onClick={closeMenu}>      {/* кнопка закртыия меню */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="7.28174" y="7.07532" width="20" height="1" transform="rotate(45 7.28174 7.07532)" fill="#D9D9D9"/>
                <rect x="6.5752" y="21.2173" width="20" height="1" transform="rotate(-45 6.5752 21.2173)" fill="#D9D9D9"/>
              </svg>
            </button>
          </nav>

          <div class="header__control">
            <Link to="/cart" className="header__cart-link" aria-label="Открыть корзину"> {cart ? cart.length : 0} </Link>  {/*  aria-label добавляем для кнопок у котрых нет надписей(для слепых) */}
            <button class="header__burger" aria-label="Открыть меню"  onClick={openMenu}>           {/* кнопка Бургер */}
              <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="9.5" width="20" height="1" fill="#D9D9D9"/>
                <rect x="4" y="14.5" width="20" height="1" fill="#D9D9D9"/>
                <rect x="4" y="19.5" width="20" height="1" fill="#D9D9D9"/>
              </svg>
            </button>
          </div> 
        </div>
      </header>
  )
};