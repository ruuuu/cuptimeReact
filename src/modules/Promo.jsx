import { Link, useSearchParams } from "react-router-dom";



// компонент
export const Promo = () => {

  const [ searchParams ] = useSearchParams(); // хук позволяет извлечь search-параметры из урла

  const category = searchParams.get("category"); // category-нзв search-параметра в урле






  return (
    <section className="promo">
      <div className="container promo__container">
        <h1 className="promo__title"> Попробуй новый вкус Арабики </h1>
        {/* в реакте вместо ссылки а использум Link */}
        { category !== 'coffee' ? <Link className="promo__link"  to="/products?category=coffee"> Перейти к кофе </Link>      
          : null
        }
      </div>
    </section>
  )
}