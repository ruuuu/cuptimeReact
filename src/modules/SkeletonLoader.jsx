// чтобы при загурке карточек товаров не видеть только шапку и футер дбаивли этот модуль
// установили билитоетку react-content-loader: npm i react-content-loader

import ContentLoader from "react-content-loader";



export const SkeletonLoader = ({ count = 6}) => (   // count- колво товаров для котрых будет отображаться лоадер, по умолчанию их 6
    <>      {/* ReactFragment */}
      {
        // // заполнили массов значениями null:
        Array(count).fill(null).map((_, index) => (
          <div className='skeleton-wrapper' key={index}>
            <ContentLoader speed={2}  viewBox='0 0 400 600' backgroundColor='#64099b' foregroundColor='#6cb9ab'>     {/* размер лодаера такой как и размер карточки */}
              <rect x="0" y="0" width="100%" height="70%" />                {/* для картинки */}
              <rect x="24" y="calc(70% + 30px)" width="60%" height="30px" />  {/* для заголовка */}
              <rect x="24" y="calc(70% + 80px)" width="40%" height="25px" />  {/* для цены */}
            </ContentLoader>
          </div>
        ))  
      }   
    </>
)
