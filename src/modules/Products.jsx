import { Product } from './Product.jsx';
import { useEffect } from 'react';
import { useProducts } from '../context/productContext.jsx';
import { useSearchParams } from 'react-router-dom';
import { SkeletonLoader } from './SkeletonLoader.jsx';



// НАЧАЛО

export const Products = () => {

  const [ searchParams ] = useSearchParams(); // из реакта хук для search-парамтров, searchParams -объект
  const category = searchParams.get('category'); // полуичли search-парамер cateogry

  const { products, setCategory } = useProducts(); // useProducts этот хук сами создали, он вызовет хук useContext(из productContext.jsx)

  console.log('products ', products)

  useEffect(() => {
    setCategory(category);  // отправится запрос к серверу , котрый прописан в useEffect(в productContext.jsx)
  }, [ category, setCategory ]);  // при смене category, вызовется переданный колбэк


  const setTitle = (category) => {
    if(category === 'tea') return 'Чай';

    if(category === 'coffee') return 'Кофе';

    if(category === 'teapots') return 'Чайники';

    if(category === 'cezves') return 'Турки';

    if(category === 'other') return 'Другое';
  }

  

  return (
        <section className="products">
          <div className="container products__container">
            <h2 className="products__title"> { setTitle(category) } </h2>

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