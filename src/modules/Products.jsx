import { Product } from './Product.jsx';
import { useEffect } from 'react';
import { useProducts } from '../context/productContext.jsx';
import { useSearchParams } from 'react-router-dom';
import { SkeletonLoader } from './SkeletonLoader.jsx';




// компонент
export const Products = () => {

  const [ searchParams ] = useSearchParams(); // из реакта хук для search-парамтров, нужен только searchParams -объект
  const category = searchParams.get('category'); // полуичли значение search-парамер cateogry из урла

  const { products, setCategory, categories } = useProducts(); // useProducts этот хук сами создали, он вызовет хук useContext(из productContext.jsx)

  console.log('products ', products)

  useEffect(() => {
    setCategory(category);  // отправится запрос к серверу , котрый прописан в useEffect(в productContext.jsx)
  }, [ category, setCategory ]);  // при смене category, вызовется переданный колбэк


 

  

  return (
        <section className="products">
          <div className="container products__container">
            <h2 className="products__title"> { categories[category] || 'Товары' } </h2>   

            <ul className="products__list">
               { products.length ? products.map((item) => { // вернет массив из <Product />
                  return ( <Product data={item}  key={item.id} /> )
                }) 
                : ( <SkeletonLoader /> )  // если продукты не подгрузилсь то вернет элмент <SkeletonLoader />
               }
            </ul>
          </div>
        </section>
  )
}