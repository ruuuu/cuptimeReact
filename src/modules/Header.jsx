import { Link } from "react-router-dom";



export const Header = () => {


  return (
    
    <header className="header">
        <div className="container header__container">
          <Link to="/" className="header__logo-link">  {/*  в реакте вместо ссылки <a> испоьзуем Link(с ним станица перезагружатся не будет), вместо htrf испльзуетс to  */}
            <img className="header__logo" src="img/logo.svg" alt="Логотип - Cup Time" /> {/*  из папки public берет картинки  */}
          </Link>

          <nav className="header__nav">
            <ul className="header__menu">
              <li className="header__menu-item">
                <a className="header__menu-link" href="#">Чай</a>
              </li>
              <li className="header__menu-item">
                <a className="header__menu-link" href="#">Кофе</a> 
              </li>
              <li className="header__menu-item">
                <a className="header__menu-link" href="#">Чайники</a>
              </li>
              <li className="header__menu-item">
                <a className="header__menu-link" href="#">Турки</a>
              </li>
              <li className="header__menu-item">
                <a className="header__menu-link" href="#">Прочее</a>
              </li>
            </ul>
          </nav>

          <Link to="/cart" className="header__cart-link" aria-label="Открыть корзину"> 6 </Link>
        </div>
      </header>
  )
};