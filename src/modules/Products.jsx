import { Product } from "./Product.jsx"
import { products } from "../products.js"



export const Products = () => {


  return (
        <section className="products">
          <div className="container products__container">
            <h2 className="products__title"> Чай </h2>

            <ul className="products__list">
               { products.map((item) => { // вернет массив из <Product />
                  return (
                    <Product data={item}  key={item.id} />      // передаем пропс data 
                  )
                }) 
               }
            </ul>
          </div>
        </section>
  )
}