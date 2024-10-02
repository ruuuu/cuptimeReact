import { Product } from './Product.jsx';
import { useEffect } from 'react';
import { useProducts } from '../context/productContext.jsx';
import { useSearchParams } from 'react-router-dom';

// НАЧАЛО

export const Products = () => {

  const [ searchParams ] = useSearchParams(); // из реакта хук для search-парамтров, searchParams -объект
  const category = searchParams.get('category'); // полуичли search-парамер cateogry

  const { products, setCategory } = useProducts(); // useProducts этот хук сами создали, он вызовет хук useContext(из productContext.jsx)


  useEffect(() => {
    setCategory(category);  // отправится запрос к серверу , котрый прописан в useEffect(в productContext.jsx)
  }, [ category, setCategory ]);  // при смене category, вызовется переданный колбэк



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