// чтобы при загурке карточек товаров не видеть только шапку и футер дбаивли этот модуль
// установили билитоетку react-content-loader: npm i react-content-loader

import ContentLoader from "react-content-loader";



export const SkeletonLoader = ({ count = 6}) => (   // count- колво товаров для котрых будет отображаться лоадер, по умолчанию их 6
    <>      {/* ReactFragment */}
      {
        // // заполнили массов значениями null:
        Array(count).fill(null).map((_, index) => (
          <div className='skeleton-wrapper' key={index}>
            <ContentLoader speed={2}  viewBox='0 0 400 600' backgroundColor='#f2f9f7' foregroundColor='#ececec'>     {/* размер лодаера такой как и размер карточки */}
              <img/>
              <h2></h2>
              <p></p>
            </ContentLoader>
          </div>
        ))  
      }   
    </>
)
