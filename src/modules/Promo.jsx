import { Link } from "react-router-dom";



// компонент
export const Promo = () => {

  return (

    <section className="promo">
      <div className="container promo__container">
        <h1 className="promo__title"> Попробуй новый вкус Арабики </h1>
        <Link className="promo__link"  to="/products?category=coffee"> Перейти к кофе </Link>
      </div>
    </section>
  )
}